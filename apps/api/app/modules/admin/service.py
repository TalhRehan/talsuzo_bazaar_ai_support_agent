from app.modules.refunds.repository import get_decision_log
from app.modules.refunds.schemas import RefundDecisionLog
from app.modules.refunds.service import get_all_refund_logs


def list_refund_logs() -> list[RefundDecisionLog]:
    return get_all_refund_logs()


def get_refund_log(request_id: str) -> RefundDecisionLog | None:
    return get_decision_log(request_id)
