from datetime import date

from app.agent.policy_engine import evaluate_policy
from app.modules.customers.service import find_customer_by_email
from app.modules.orders.service import find_order_by_id
from app.modules.refunds.schemas import RefundRequest


def make_request(
    customer_email: str = "ayesha.khan@example.com",
    order_id: str = "ORD-5001",
    product_id: str | None = "PROD-2001",
    product_name: str | None = None,
    reason: str = "The product arrived damaged.",
) -> RefundRequest:
    return RefundRequest(
        customer_email=customer_email,
        order_id=order_id,
        product_id=product_id,
        product_name=product_name,
        reason=reason,
    )


def test_valid_low_value_damaged_item_is_approved() -> None:
    request = make_request()

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "approved"
    assert "VALID_REFUND_APPROVAL" in decision["matched_rules"]


def test_missing_order_id_is_denied() -> None:
    request = make_request(order_id="")

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        None,
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "ORDER_ID_REQUIRED" in decision["matched_rules"]


def test_unknown_customer_is_denied() -> None:
    request = make_request(customer_email="missing@example.com")

    decision = evaluate_policy(
        request,
        None,
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "CUSTOMER_NOT_FOUND" in decision["matched_rules"]


def test_unknown_order_is_denied() -> None:
    request = make_request(order_id="ORD-9999")

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        None,
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "ORDER_NOT_FOUND" in decision["matched_rules"]


def test_order_customer_mismatch_is_denied() -> None:
    request = make_request(customer_email="daniel.brooks@example.com", order_id="ORD-5001")

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "ORDER_CUSTOMER_MISMATCH" in decision["matched_rules"]


def test_final_sale_item_is_denied() -> None:
    request = make_request(
        customer_email="daniel.brooks@example.com",
        order_id="ORD-5002",
        product_id="PROD-2002",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "FINAL_SALE_DENIAL" in decision["matched_rules"]


def test_outside_refund_window_is_denied() -> None:
    request = make_request(
        customer_email="james.wilson@example.com",
        order_id="ORD-5008",
        product_id="PROD-2009",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "denied"
    assert "OUTSIDE_REFUND_WINDOW" in decision["matched_rules"]


def test_high_value_refund_is_escalated() -> None:
    request = make_request(
        customer_email="lina.chen@example.com",
        order_id="ORD-5011",
        product_id="PROD-2012",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "escalated"
    assert "HIGH_VALUE_REFUND_ESCALATION" in decision["matched_rules"]


def test_high_risk_customer_is_escalated() -> None:
    request = make_request(
        customer_email="omar.farooq@example.com",
        order_id="ORD-5004",
        product_id="PROD-2004",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "escalated"
    assert "HIGH_RISK_CUSTOMER_ESCALATION" in decision["matched_rules"]


def test_pending_refund_is_escalated() -> None:
    request = make_request(
        customer_email="fatima.noor@example.com",
        order_id="ORD-5009",
        product_id="PROD-2010",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "escalated"
    assert "PENDING_REFUND_ESCALATION" in decision["matched_rules"]


def test_repeated_refund_abuse_risk_is_escalated() -> None:
    request = make_request(
        customer_email="lina.chen@example.com",
        order_id="ORD-5018",
        product_id="PROD-2020",
    )

    decision = evaluate_policy(
        request,
        find_customer_by_email(str(request.customer_email)),
        find_order_by_id(request.order_id),
        today=date(2026, 6, 1),
    )

    assert decision["status"] == "escalated"
    assert "REFUND_ABUSE_RISK_ESCALATION" in decision["matched_rules"]
