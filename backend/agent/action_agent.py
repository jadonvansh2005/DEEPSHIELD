from agent_engine import AgentEngine

engine = AgentEngine()

def action_node(state):

    video_score = state.get("video_score", 0)
    audio_score = state.get("audio_score", 0)
    final_score = state.get("final_score", 0)
    verification = state.get("verification", {})

    result = engine.run(
        video_score,
        audio_score,
        final_score,
        verification
    )

    return result