from datetime import datetime, timezone
from typing import TypedDict
from uuid import uuid4

from pydantic import BaseModel

from app.agent.guardrails import contains_prompt_injection
from app.agent.policy_engine import PolicyDecision, evaluate_policy
from app.core.config import settings
from app.modules.customers.schemas import CustomerProfile
from app.modules.customers.service import find_customer_by_email
from app.modules.orders.schemas import OrderRecord
from app.modules.orders.service import find_order_by_id
from app.modules.refunds.repository import save_decision_log
from app.modules.refunds.schemas import RefundRequest, RefundResponse


class AgentSummary(BaseModel):
    summary: str


class RefundAgentState(TypedDict, total=False):
    payload: RefundRequest
    request_id: str
    created_at: datetime
    actions: list[str]
    prompt_injection_detected: bool
    customer: CustomerProfile | None
    order: OrderRecord | None
    policy_decision: PolicyDecision
    agent_summary: str
    final_response: RefundResponse


def receive_request(state: RefundAgentState) -> RefundAgentState:
    return {
        **state,
        "request_id": state.get("request_id", str(uuid4())),
        "created_at": state.get("created_at", datetime.now(timezone.utc)),
        "actions": [*state.get("actions", []), "receive_request"],
    }


def validate_input(state: RefundAgentState) -> RefundAgentState:
    return {**state, "actions": [*state.get("actions", []), "validate_input"]}


def detect_prompt_injection(state: RefundAgentState) -> RefundAgentState:
    payload = state["payload"]
    detected = contains_prompt_injection(payload.reason) or contains_prompt_injection(payload.message or "")
    next_state = {
        **state,
        "prompt_injection_detected": detected,
        "actions": [*state.get("actions", []), "detect_prompt_injection"],
    }

    if detected:
        next_state["policy_decision"] = {
            "status": "escalated",
            "reason": "Request contains instructions that may be attempting to bypass company policy.",
            "matched_rules": ["PROMPT_INJECTION_ESCALATION"],
            "actions": ["human_escalation"],
        }

    return next_state


def lookup_customer(state: RefundAgentState) -> RefundAgentState:
    if state.get("prompt_injection_detected"):
        return state

    customer = find_customer_by_email(str(state["payload"].customer_email))
    return {
        **state,
        "customer": customer,
        "actions": [*state.get("actions", []), "lookup_customer"],
    }


def lookup_order(state: RefundAgentState) -> RefundAgentState:
    if state.get("prompt_injection_detected"):
        return state

    order = find_order_by_id(state["payload"].order_id)
    return {
        **state,
        "order": order,
        "actions": [*state.get("actions", []), "lookup_order"],
    }


def check_policy(state: RefundAgentState) -> RefundAgentState:
    if state.get("policy_decision"):
        return state

    decision = evaluate_policy(
        state["payload"],
        state.get("customer"),
        state.get("order"),
    )
    return {
        **state,
        "policy_decision": decision,
        "actions": [*state.get("actions", []), "check_policy"],
    }


def llm_reasoning_summary(state: RefundAgentState) -> RefundAgentState:
    decision = state["policy_decision"]
    summary = _fallback_summary(decision)

    if settings.openai_api_key:
        summary = _openai_summary(state, summary)

    return {
        **state,
        "agent_summary": summary,
        "actions": [*state.get("actions", []), "llm_reasoning_summary"],
    }


def final_decision(state: RefundAgentState) -> RefundAgentState:
    payload = state["payload"]
    decision = state["policy_decision"]
    customer = state.get("customer")
    order = state.get("order")

    response = RefundResponse(
        request_id=state["request_id"],
        status=decision["status"],
        customer_email=payload.customer_email,
        customer_id=customer.customer_id if customer else None,
        order_id=order.order_id if order else payload.order_id,
        reason=decision["reason"],
        matched_rules=decision["matched_rules"],
        actions=[*state.get("actions", []), *decision["actions"], "final_decision"],
        agent_summary=state.get("agent_summary"),
        created_at=state["created_at"],
    )

    return {**state, "final_response": response}


def save_log(state: RefundAgentState) -> RefundAgentState:
    response = state["final_response"].model_copy(
        update={"actions": [*state["final_response"].actions, "save_log"]}
    )
    save_decision_log(state["payload"], response)
    return {**state, "final_response": response}


def _fallback_summary(decision: PolicyDecision) -> str:
    return (
        f"Decision: {decision['status']}. "
        f"Reason: {decision['reason']} "
        f"Matched rules: {', '.join(decision['matched_rules'])}."
    )


def _openai_summary(state: RefundAgentState, fallback: str) -> str:
    try:
        from langchain_openai import ChatOpenAI
    except ImportError:
        return fallback

    decision = state["policy_decision"]
    customer = state.get("customer")
    order = state.get("order")

    model = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )
    structured_model = model.with_structured_output(AgentSummary)
    try:
        result = structured_model.invoke(
            [
                (
                    "system",
                    "You summarize refund decisions for ecommerce support. "
                    "Do not change the status, reason, or matched policy rules. "
                    "The deterministic policy engine is the source of truth.",
                ),
                (
                    "human",
                    "Create a concise customer-safe summary for this refund decision.\n"
                    f"Status: {decision['status']}\n"
                    f"Reason: {decision['reason']}\n"
                    f"Rules: {decision['matched_rules']}\n"
                    f"Customer risk: {customer.risk_level if customer else 'unknown'}\n"
                    f"Order total: {order.total_price if order else 'unknown'}",
                ),
            ]
        )
        return result.summary
    except Exception:
        return fallback
