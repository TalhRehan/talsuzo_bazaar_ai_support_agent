from fastapi import APIRouter

from app.core.responses import ApiResponse
from app.modules.admin.service import get_refund_log, list_refund_logs
from app.modules.refunds.schemas import RefundDecisionLog


router = APIRouter()


@router.get("/refunds", response_model=ApiResponse[list[RefundDecisionLog]])
def refund_logs() -> ApiResponse[list[RefundDecisionLog]]:
    return ApiResponse(
        success=True,
        message="Refund decision logs retrieved.",
        data=list_refund_logs(),
    )


@router.get("/refunds/{request_id}/logs", response_model=ApiResponse[RefundDecisionLog | None])
def refund_log_detail(request_id: str) -> ApiResponse[RefundDecisionLog | None]:
    log = get_refund_log(request_id)
    return ApiResponse(
        success=log is not None,
        message="Refund decision log retrieved." if log else "Refund decision log not found.",
        data=log,
    )
