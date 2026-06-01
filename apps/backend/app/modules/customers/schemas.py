from pydantic import BaseModel, EmailStr


class CustomerProfile(BaseModel):
    customer_id: str
    name: str
    email: EmailStr
    phone: str
    account_status: str
    risk_level: str
    loyalty_tier: str
    created_at: str
    total_orders: int
    refund_count: int
    notes: str
