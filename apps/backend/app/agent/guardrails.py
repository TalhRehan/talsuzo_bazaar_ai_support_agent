SUSPICIOUS_INSTRUCTIONS = (
    "ignore policy",
    "ignore all policies",
    "bypass",
    "approve my refund",
    "developer said",
    "system prompt",
)


def contains_prompt_injection(text: str) -> bool:
    normalized = text.lower()
    return any(phrase in normalized for phrase in SUSPICIOUS_INSTRUCTIONS)
