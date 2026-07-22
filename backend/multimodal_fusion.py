import torch
import numpy as np

from verification_engine import VerificationEngine
from agent_engine import AgentEngine   # ✅ NEW

# -------------------------
# FUSION CLASS
# -------------------------
class DeepfakeFusionSystem:
    def __init__(self):
        pass  # no dependency needed

    def fuse(self, video_score, audio_score):

        diff = abs(video_score - audio_score)

        if diff < 0.2:
            final_score = (video_score + audio_score) / 2
            reason = "Both models agree"

        # elif diff > 0.6:
        #     final_score = audio_score
        #     reason = "High disagreement → trusting AUDIO"

        else:
            final_score = (0.4 * video_score) + (0.6 * audio_score)
            reason = "Moderate disagreement → audio weighted more"

        return float(final_score), reason

    # -------------------------
    # MAIN PIPELINE
    # -------------------------
    def predict(self, video_path, audio_path):
        print("\n🔍 Running Multimodal Analysis...")

        # -------------------------
        # VIDEO
        # -------------------------
        video_score, frame_scores = self.video_model.predict(video_path)
        print(f"🎥 Video Fake Score: {video_score:.4f}")
        # -------------------------
        # AUDIO

        # -------------------------
        audio_score = self.audio_model.predict(audio_path)
        print(f"🎧 Audio Fake Score: {audio_score:.4f}")

        # -------------------------
        # FUSION
        # -------------------------
        final_score, fusion_reason = self.fuse(video_score, audio_score)

        print(f"\n🔥 Final Deepfake Score: {final_score:.4f}")
        print(f"📊 Fusion Reason: {fusion_reason}")

        # -------------------------
        # VERIFICATION
        # -------------------------
        verification = self.verifier.verify(
            video_path,
            audio_path,
            video_score,
            audio_score,
            frame_scores
        )

        print("\n🔍 VERIFICATION RESULT:")
        for k, v in verification.items():
            print(f"{k}: {v}")

        # -------------------------
        # 🤖 AGENT REASONING (CORE 🔥)
        # -------------------------
        agent_output = self.agent.run(
            video_score=video_score,
            audio_score=audio_score,
            final_score=final_score,
            verification=verification
        )

        print("\n🤖 AGENT OUTPUT:")
        print(agent_output)

        # -------------------------
        # FINAL RETURN
        # -------------------------
        return {
            "video_score": video_score,
            "audio_score": audio_score,
            "final_score": final_score,
            "fusion_reason": fusion_reason,
            "verification": verification,
            "agent_output": agent_output   # 🔥 MOST IMPORTANT
        }


fusion_system = DeepfakeFusionSystem()

def fuse_scores(video_score, audio_score):
    """
    This is the function your backend calls.
    It uses the same fusion logic internally.
    """

    final_score, reason = fusion_system.fuse(video_score, audio_score)

    print(f"📊 Fusion Reason: {reason}")

    return float(final_score)