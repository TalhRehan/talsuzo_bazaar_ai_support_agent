# Data Layer

This folder contains synthetic local data for the AI support workflow.

## Files

- `customers.json`: synthetic CRM customer profiles
- `orders.json`: synthetic customer order history
- `decision_logs.json`: saved agent decisions and action logs

These files are enough for the initial assignment. A database such as MongoDB can be added later if needed.

## Current Seed Data

- 15 synthetic customers
- 18 synthetic orders
- USD pricing
- Realistic payment methods
- Normal, invalid, and edge-case refund scenarios

## Included Scenarios

- Eligible damaged-item refund
- Final-sale item denial
- Refund outside the 30-day window
- High-value refund escalation
- Suspended account escalation
- High-risk customer escalation
- Already refunded duplicate request
- Existing pending refund request
- Lost shipment escalation
- In-transit order escalation
- Mixed final-sale and refundable order
- Gift card and store credit payment cases
