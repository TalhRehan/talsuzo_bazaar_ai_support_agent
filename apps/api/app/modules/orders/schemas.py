from pydantic import BaseModel


class OrderItem(BaseModel):
    product_id: str
    name: str
    category: str
    quantity: int
    unit_price: float
    total_price: float
    final_sale: bool = False
    condition_on_delivery: str


class OrderRecord(BaseModel):
    order_id: str
    customer_id: str
    products: list[OrderItem]
    subtotal: float
    shipping_fee: float
    tax: float
    total_price: float
    currency: str
    order_date: str
    delivered_at: str | None
    delivery_status: str
    refund_status: str
    payment_method: str
    scenario_tags: list[str] = []
