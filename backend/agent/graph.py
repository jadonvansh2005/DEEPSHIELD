from langgraph.graph import StateGraph, START, END

from agent.state import DeepfakeState
from agent.planner import planner_node
from agent.executor import executor_node
from agent.fusion import fusion_node
from agent.verification import verification_node
from agent.decision import decision_node
from agent.action_agent import action_node

builder = StateGraph(DeepfakeState)

builder.add_node("planner", planner_node)
builder.add_node("executor", executor_node)
builder.add_node("fusion", fusion_node)
builder.add_node("verification", verification_node)
builder.add_node("decision", decision_node)
builder.add_node("action", action_node)

builder.add_edge(START, "planner")
builder.add_edge("planner", "executor")
builder.add_edge("executor", "fusion")
builder.add_edge("fusion", "verification")
builder.add_edge("verification", "decision")
builder.add_edge("decision", "action")
builder.add_edge("action", END)

app = builder.compile()