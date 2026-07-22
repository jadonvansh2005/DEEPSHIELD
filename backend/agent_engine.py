# from dotenv import load_dotenv
# import os

# load_dotenv()

# from langchain_google_genai import ChatGoogleGenerativeAI

# class AgentEngine:

#     def __init__(self):
#         self.llm = ChatGoogleGenerativeAI(
#             model="gemini-1.5-flash",
#             temperature=0.7,
            
#         )

#     def run(self, video_score, audio_score, verification):

#         prompt = f"""
# You are an AI Deepfake Detection Agent.

# Inputs:
# - Video Score: {video_score}
# - Audio Score: {audio_score}
# - Verification: {verification}

# Think step by step and decide:

# Return:
# Thought:
# Reasoning:
# Action:
# """

#         response = self.llm.invoke(prompt)

#         return response.content

# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# load_dotenv()

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# model = genai.GenerativeModel("gemini-2.0-flash")

# response = model.generate_content("Hello")

# print(response.text)

import json
import os
from datetime import datetime

# 🔥 IMPORT REAL ACTION SERVICES
from services.block_service import block_user
from services.flag_service import flag_user
from services.alert_service import send_alert
from services.allow_service import allow_user
from database.db import get_user_status


class AgentEngine:

    def __init__(self):
        self.log_file = "agent_logs.json"

    def run(self, video_score, audio_score, final_score, verification, user_id="user_1"):

        diff = abs(video_score - audio_score)

        # -------------------------
        # 🧠 DECISION LOGIC
        # -------------------------
        if verification.get("verification_status") == "SUSPICIOUS (MODAL CONFLICT)":

            if final_score >= 0.6:
                action = "BLOCK"
            elif video_score >= 0.5 or audio_score >= 0.5:
                action = "FLAG"
            else:
                action = "ALERT"

        else:

            if final_score >= 0.5:
                action = "BLOCK"

            elif video_score < 0.5 and audio_score < 0.5:
                action = "ALLOW"

            else:
                action = "ALERT"

        # -------------------------
        # ⚙️ REAL ACTION EXECUTION
        # -------------------------
        system_result = self.execute_action(action, {
            "video_score": video_score,
            "audio_score": audio_score,
            "final_score": final_score,
            "verification": verification,
            "user_id": user_id   # 🔥 ADD THIS LINE
        })

        # -------------------------
        # 📦 FINAL RESULT
        # -------------------------
        result = {
            "timestamp": str(datetime.now()),
            "video_score": video_score,
            "audio_score": audio_score,
            "final_score": final_score,
            "verification": verification,
            "action": action,
            "system_action_result": system_result
        }

        # -------------------------
        # 🗄️ SAVE LOG
        # -------------------------
        self.save_log(result)

        return result

    # -------------------------
    # 🔥 ACTION EXECUTION LAYER
    # -------------------------
    def execute_action(self, action, state):

        if action == "BLOCK":
            return block_user(state)

        elif action == "FLAG":
            return flag_user(state)

        elif action == "ALERT":
            return send_alert(state)

        else:
            return allow_user(state)

    # -------------------------
    # 🗄️ SAVE LOG
    # -------------------------
    def save_log(self, data):

        if os.path.exists(self.log_file):
            try:
                with open(self.log_file, "r") as f:
                    logs = json.load(f)
            except:
                logs = []
        else:
            logs = []

        logs.append(data)

        with open(self.log_file, "w") as f:
            json.dump(logs, f, indent=4)


from pipelines.preprocess import extract_audio
from video_model import predict_video
from audio_model import predict_audio
from multimodal_fusion import fuse_scores
from verification_engine import verify


def run_agent(file_path, file_type, user_id="user_1"):

    # 🔥 STEP 1 — CHECK USER STATUS
    status = get_user_status(user_id)

    if status == "BLOCKED":
        return {
            "message": "🚨 USER BLOCKED",
            "action": "BLOCK"
        }

    engine = AgentEngine()

    video_score = 0
    audio_score = 0
    frame_scores = []

    if file_type == "video":
        video_score, frame_scores = predict_video(file_path)

        audio_path = extract_audio(file_path)
        audio_score = predict_audio(audio_path)

    elif file_type == "audio":
        audio_score = predict_audio(file_path)

    final_score = fuse_scores(video_score, audio_score)

    verification = verify({
        "video_score": video_score,
        "audio_score": audio_score,
        "final_score": final_score,
        "frame_scores": frame_scores
    })

    # 🔥 PASS USER_ID TO AGENT
    return engine.run(
        video_score,
        audio_score,
        final_score,
        verification,
        user_id=user_id
    )

    