from fastapi import APIRouter

from app.core.responses import ApiResponse
from app.modules.refunds.schemas import RefundRequest, RefundResponse
from app.modules.refunds.service import create_refund_request, get_refund_request


router = APIRouter()


@router.post("/request", response_model=ApiResponse[RefundResponse])
def request_refund(payload: RefundRequest) -> ApiResponse[RefundResponse]:
    decision = create_refund_request(payload)
    return ApiResponse(
        success=True,
        message="Refund request processed.",
        data=decision,
    )


@router.get("/{request_id}", response_model=ApiResponse[RefundResponse])
def refund_detail(request_id: str) -> ApiResponse[RefundResponse]:
    decision = get_refund_request(request_id)
    return ApiResponse(
        success=True,
        message="Refund request detail retrieved.",
        data=decision,
    )
