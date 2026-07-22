def decision_node(state):
    signals = []
    v = state["verification"]

    if state.get("video_score", 0) > 0.8:
        signals.append("video")

    if state.get("audio_score", 0) > 0.8:
        signals.append("audio")

    if v["frame_stability"].startswith("UNSTABLE"):
        signals.append("frame")

    if v["modal_consistency"] == "INCONSISTENT":
        signals.append("mismatch")

    if len(signals) >= 3:
        return {"action": "BLOCK"}

    elif len(signals) == 2:
        return {"action": "FLAG"}

    elif len(signals) == 1:
        return {"action": "ALERT"}

    return {"action": "ALLOW"}