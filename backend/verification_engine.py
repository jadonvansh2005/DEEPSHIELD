import numpy as np

# ===============================
# VERIFICATION ENGINE CLASS
# ===============================
class VerificationEngine:

    def verify(self, video_path, audio_path, video_score, audio_score, frame_scores=None):
        print("🔍 Running Verification...")

        # -------------------------
        # Frame Stability Check
        # -------------------------
        if frame_scores and len(frame_scores) > 0:
            variance = max(frame_scores) - min(frame_scores)

            if variance > 0.5:
                frame_stability = "UNSTABLE (flickering / inconsistent)"
            else:
                frame_stability = "STABLE"
        else:
            frame_stability = "UNKNOWN"

        # -------------------------
        # Modal Consistency
        # -------------------------
        diff = abs(video_score - audio_score)

        if diff < 0.3:
            modal_consistency = "CONSISTENT"
        else:
            modal_consistency = "INCONSISTENT"

        # -------------------------
        # Statistical Check
        # -------------------------
        if video_score > 0.8 or audio_score > 0.8:
            statistical_check = "HIGH FAKE PROBABILITY"
        elif video_score < 0.2 and audio_score < 0.2:
            statistical_check = "LIKELY REAL"
        else:
            statistical_check = "UNCERTAIN"

        # -------------------------
        # FINAL VERIFICATION STATUS
        # -------------------------
        if modal_consistency == "INCONSISTENT":
            verification_status = "SUSPICIOUS (MODAL CONFLICT)"
        elif statistical_check == "HIGH FAKE PROBABILITY":
            verification_status = "LIKELY FAKE"
        elif statistical_check == "LIKELY REAL":
            verification_status = "LIKELY REAL"
        else:
            verification_status = "UNCERTAIN"

        return {
            "frame_stability": frame_stability,
            "modal_consistency": modal_consistency,
            "statistical_check": statistical_check,
            "verification_status": verification_status
        }


# ===============================
# 🔥 WRAPPER FUNCTION (IMPORTANT)
# ===============================
def verify(state):
    """
    This is the function your backend calls.
    """

    engine = VerificationEngine()

    return engine.verify(
        video_path=None,
        audio_path=None,
        video_score=state.get("video_score", 0),
        audio_score=state.get("audio_score", 0),
        frame_scores=None
    )