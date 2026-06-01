import json

from app.core.paths import DATA_DIR
from app.modules.refunds.schemas import RefundDecisionLog, RefundRequest, RefundResponse


DECISION_LOGS_PATH = DATA_DIR / "decision_logs.json"


def list_decision_logs() -> list[RefundDecisionLog]:
    if not DECISION_LOGS_PATH.exists():
        return []

    raw_logs = json.loads(DECISION_LOGS_PATH.read_text(encoding="utf-8"))
    return [RefundDecisionLog.model_validate(log) for log in raw_logs]


def get_decision_log(request_id: str) -> RefundDecisionLog | None:
    return next(
        (log for log in list_decision_logs() if log.request_id == request_id),
        None,
    )


def save_decision_log(payload: RefundRequest, response: RefundResponse) -> None:
    logs = [log.model_dump(mode="json") for log in list_decision_logs()]
    logs.append(
        RefundDecisionLog(
            **response.model_dump(),
            product_id=payload.product_id,
            product_name=payload.product_name,
            customer_message=payload.message,
        ).model_dump(mode="json")
    )
    DECISION_LOGS_PATH.write_text(json.dumps(logs, indent=2), encoding="utf-8")
