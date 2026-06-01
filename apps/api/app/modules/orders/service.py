import json
from functools import lru_cache

from app.core.paths import DATA_DIR
from app.modules.orders.schemas import OrderRecord


@lru_cache
def list_orders() -> list[OrderRecord]:
    path = DATA_DIR / "orders.json"
    raw_orders = json.loads(path.read_text(encoding="utf-8"))
    return [OrderRecord.model_validate(order) for order in raw_orders]


def find_order_by_id(order_id: str) -> OrderRecord | None:
    normalized_order_id = order_id.strip().upper()
    return next(
        (order for order in list_orders() if order.order_id == normalized_order_id),
        None,
    )


def list_orders_for_customer(customer_id: str) -> list[OrderRecord]:
    return [order for order in list_orders() if order.customer_id == customer_id]
