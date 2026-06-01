from datetime import datetime, timezone

from app.agent.refund_agent import evaluate_refund_request
from app.modules.refunds.repository import get_decision_log, list_decision_logs
from app.modules.refunds.schemas import RefundDecisionLog, RefundRequest, RefundResponse


def create_refund_request(payload: RefundRequest) -> RefundResponse:
    return evaluate_refund_request(payload)


def get_refund_request(request_id: str) -> RefundResponse:
    decision = get_decision_log(request_id)
    if decision is not None:
        return RefundResponse(**decision.model_dump())

    return RefundResponse(
        request_id=request_id,
        status="denied",
        customer_email="unknown@example.com",
        order_id="unknown",
        reason="Refund request was not found.",
        matched_rules=["REFUND_REQUEST_NOT_FOUND"],
        actions=["admin_lookup"],
        created_at=datetime.now(timezone.utc),
    )


def get_all_refund_logs() -> list[RefundDecisionLog]:
    return list_decision_logs()
