from tools.video_tool import run_video_model
from tools.audio_tool import run_audio_model

def executor_node(state):
    models = state["selected_models"]
    path = state["input_data"]

    result = {}

    if "video" in models:
        result.update(run_video_model(path))

    if "audio" in models:
        result.update(run_audio_model(path))

    return result