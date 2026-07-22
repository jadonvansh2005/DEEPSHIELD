from typing import TypedDict, List, Dict

class DeepfakeState(TypedDict):
    input_data: str
    input_type: str

    # model outputs
    audio_score: float
    video_score: float

    # fusion
    final_score: float

    # verification
    verification: Dict

    # decision
    action: str

    # control
    selected_models: List[str]