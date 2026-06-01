from datetime import date
from typing import Literal, TypedDict

from app.modules.customers.schemas import CustomerProfile
from app.modules.orders.schemas import OrderItem, OrderRecord
from app.modules.refunds.schemas import RefundRequest


RefundStatus = Literal["approved", "denied", "escalated"]
HIGH_VALUE_ORDER_THRESHOLD = 300.0
HIGH_VALUE_ITEM_THRESHOLD = 250.0
REFUND_WINDOW_DAYS = 30


class PolicyDecision(TypedDict):
    status: RefundStatus
    reason: str
    matched_rules: list[str]
    actions: list[str]


def evaluate_policy(
    payload: RefundRequest,
    customer: CustomerProfile | None = None,
    order: OrderRecord | None = None,
    today: date | None = None,
) -> PolicyDecision:
    today = today or date.today()
    actions = ["policy_validation"]

    if not str(payload.customer_email).strip():
        return _deny("Customer email is required.", ["CUSTOMER_EMAIL_REQUIRED"], actions)

    if not payload.order_id.strip():
        return _deny("Refund cannot be processed because the order ID is missing.", ["ORDER_ID_REQUIRED"], actions)

    if customer is None:
        return _deny("Customer email was not found in the TalSuzo Bazaar CRM data.", ["CUSTOMER_NOT_FOUND"], actions)

    actions.append("customer_validation")
    if order is None:
        return _deny("Order ID was not found in the TalSuzo Bazaar order history.", ["ORDER_NOT_FOUND"], actions)

    actions.append("order_validation")
    if order.customer_id != customer.customer_id:
        return _deny("The order does not belong to the requesting customer.", ["ORDER_CUSTOMER_MISMATCH"], actions)

    if payload.product_id is None and payload.product_name is None and len(order.products) > 1:
        if any(item.final_sale for item in order.products):
            return _escalate("The order contains both refundable and final-sale items, so a full-order refund requires review.", ["MIXED_ELIGIBILITY_ESCALATION"], actions)

        return _escalate("The order contains multiple items. The customer must identify which product needs a refund.", ["PRODUCT_SELECTION_REQUIRED"], actions)

    requested_item = _find_requested_item(payload, order)
    if requested_item is None:
        return _deny("The requested product was not found in this order.", ["PRODUCT_NOT_IN_ORDER"], actions)

    if order.refund_status == "approved":
        return _deny("This order already has an approved refund.", ["DUPLICATE_REFUND_DENIAL"], actions)

    if order.refund_status == "denied":
        return _deny("A refund for this order was already denied.", ["DUPLICATE_REFUND_DENIAL"], actions)

    if order.refund_status == "pending":
        return _escalate("A refund request for this order is already pending review.", ["PENDING_REFUND_ESCALATION"], actions)

    if requested_item.final_sale:
        return _deny("The requested item is marked as final sale and is not refundable.", ["FINAL_SALE_DENIAL"], actions)

    if order.delivery_status == "in_transit":
        return _escalate("The order is still in transit and must be reviewed as a shipping issue.", ["NOT_DELIVERED_ESCALATION"], actions)

    if order.delivery_status == "lost":
        return _escalate("The shipment is marked as lost and requires carrier verification.", ["LOST_SHIPMENT_ESCALATION"], actions)

    if order.delivery_status != "delivered":
        return _escalate("The order is not in a standard delivered state and requires human review.", ["DELIVERY_STATUS_ESCALATION"], actions)

    if order.delivered_at is None:
        return _escalate("The delivery date is missing and refund eligibility cannot be confirmed automatically.", ["MISSING_DELIVERY_DATE_ESCALATION"], actions)

    delivered_on = date.fromisoformat(order.delivered_at)
    days_since_delivery = (today - delivered_on).days
    if days_since_delivery > REFUND_WINDOW_DAYS:
        return _deny("The request is outside the 30-day refund window.", ["OUTSIDE_REFUND_WINDOW"], actions)

    if days_since_delivery < 0:
        return _escalate("The delivery date appears to be in the future and requires human review.", ["INVALID_DELIVERY_DATE_ESCALATION"], actions)

    if order.total_price >= HIGH_VALUE_ORDER_THRESHOLD or requested_item.total_price >= HIGH_VALUE_ITEM_THRESHOLD:
        return _escalate("The refund value exceeds the automatic approval threshold.", ["HIGH_VALUE_REFUND_ESCALATION"], actions)

    if customer.account_status == "suspended":
        return _escalate("The customer account is suspended and requires human review.", ["SUSPENDED_ACCOUNT_ESCALATION"], actions)

    if customer.risk_level == "high":
        return _escalate("The customer risk level is high and requires human review.", ["HIGH_RISK_CUSTOMER_ESCALATION"], actions)

    if customer.refund_count >= 3:
        return _escalate("The customer has a high number of previous refunds.", ["REFUND_ABUSE_RISK_ESCALATION"], actions)

    return {
        "status": "approved",
        "reason": "The request meets TalSuzo Bazaar refund policy requirements.",
        "matched_rules": ["VALID_REFUND_APPROVAL"],
        "actions": actions + ["approval_decision"],
    }


def _find_requested_item(payload: RefundRequest, order: OrderRecord) -> OrderItem | None:
    if payload.product_id:
        product_id = payload.product_id.strip().upper()
        return next((item for item in order.products if item.product_id == product_id), None)

    if payload.product_name:
        product_name = payload.product_name.strip().lower()
        return next((item for item in order.products if item.name.lower() == product_name), None)

    if len(order.products) == 1:
        return order.products[0]

    return None


def _deny(reason: str, matched_rules: list[str], actions: list[str]) -> PolicyDecision:
    return {
        "status": "denied",
        "reason": reason,
        "matched_rules": matched_rules,
        "actions": actions + ["denial_decision"],
    }


def _escalate(reason: str, matched_rules: list[str], actions: list[str]) -> PolicyDecision:
    return {
        "status": "escalated",
        "reason": reason,
        "matched_rules": matched_rules,
        "actions": actions + ["human_escalation"],
    }
