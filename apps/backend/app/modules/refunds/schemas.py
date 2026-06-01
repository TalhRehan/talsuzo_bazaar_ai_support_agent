from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr


RefundStatus = Literal["approved", "denied", "escalated"]


class RefundRequest(BaseModel):
    customer_email: EmailStr
    order_id: str
    product_id: str | None = None
    product_name: str | None = None
    reason: str
    message: str | None = None


class RefundResponse(BaseModel):
    request_id: str
    status: RefundStatus
    customer_email: EmailStr | str
    customer_id: str | None = None
    order_id: str
    reason: str
    matched_rules: list[str]
    actions: list[str]
    agent_summary: str | None = None
    created_at: datetime | None = None


class RefundDecisionLog(RefundResponse):
    product_id: str | None = None
    product_name: str | None = None
    customer_message: str | None = None
