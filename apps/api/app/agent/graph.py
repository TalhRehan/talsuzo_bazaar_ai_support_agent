from app.agent.tools import (
    RefundAgentState,
    check_policy,
    detect_prompt_injection,
    final_decision,
    llm_reasoning_summary,
    lookup_customer,
    lookup_order,
    receive_request,
    save_log,
    validate_input,
)


def build_refund_graph():
    try:
        from langgraph.graph import END, StateGraph
    except ImportError:
        return None

    graph = StateGraph(RefundAgentState)
    graph.add_node("receive_request", receive_request)
    graph.add_node("validate_input", validate_input)
    graph.add_node("detect_prompt_injection", detect_prompt_injection)
    graph.add_node("lookup_customer", lookup_customer)
    graph.add_node("lookup_order", lookup_order)
    graph.add_node("check_policy", check_policy)
    graph.add_node("llm_reasoning_summary", llm_reasoning_summary)
    graph.add_node("final_decision", final_decision)
    graph.add_node("save_log", save_log)

    graph.set_entry_point("receive_request")
    graph.add_edge("receive_request", "validate_input")
    graph.add_edge("validate_input", "detect_prompt_injection")
    graph.add_edge("detect_prompt_injection", "lookup_customer")
    graph.add_edge("lookup_customer", "lookup_order")
    graph.add_edge("lookup_order", "check_policy")
    graph.add_edge("check_policy", "llm_reasoning_summary")
    graph.add_edge("llm_reasoning_summary", "final_decision")
    graph.add_edge("final_decision", "save_log")
    graph.add_edge("save_log", END)
    return graph.compile()


def run_refund_workflow(state: RefundAgentState) -> RefundAgentState:
    graph = build_refund_graph()
    if graph is not None:
        return graph.invoke(state)

    # Local fallback keeps tests and development working before LangGraph is installed.
    for node in (
        receive_request,
        validate_input,
        detect_prompt_injection,
        lookup_customer,
        lookup_order,
        check_policy,
        llm_reasoning_summary,
        final_decision,
        save_log,
    ):
        state = node(state)
    return state
