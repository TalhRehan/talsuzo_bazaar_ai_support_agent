import json
from functools import lru_cache

from app.core.paths import DATA_DIR
from app.modules.customers.schemas import CustomerProfile


@lru_cache
def list_customers() -> list[CustomerProfile]:
    path = DATA_DIR / "customers.json"
    raw_customers = json.loads(path.read_text(encoding="utf-8"))
    return [CustomerProfile.model_validate(customer) for customer in raw_customers]


def find_customer_by_email(email: str) -> CustomerProfile | None:
    normalized_email = email.strip().lower()
    return next(
        (customer for customer in list_customers() if customer.email.lower() == normalized_email),
        None,
    )


def find_customer_by_id(customer_id: str) -> CustomerProfile | None:
    return next(
        (customer for customer in list_customers() if customer.customer_id == customer_id),
        None,
    )
