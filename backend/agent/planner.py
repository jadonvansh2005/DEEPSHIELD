def planner_node(state):
    file_type = state["input_type"]

    if file_type == "video":
        return {"selected_models": ["video", "audio"]}
    elif file_type == "audio":
        return {"selected_models": ["audio"]}
    else:
        return {"selected_models": ["video"]}