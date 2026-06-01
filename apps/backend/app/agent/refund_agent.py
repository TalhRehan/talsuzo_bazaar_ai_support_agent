from app.agent.graph import run_refund_workflow
from app.modules.refunds.schemas import RefundRequest, RefundResponse


def evaluate_refund_request(payload: RefundRequest) -> RefundResponse:
    final_state = run_refund_workflow({"payload": payload})
    return final_state["final_response"]
