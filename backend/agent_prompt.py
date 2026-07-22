def build_prompt(video_score, audio_score, verification):

    return f"""
You are an AI Deepfake Detection Agent.

You have:
- Video Score: {video_score}
- Audio Score: {audio_score}
- Verification: {verification}

Follow steps:
1. Think step by step
2. Analyze mismatch, confidence
3. Decide action: ALLOW / FLAG / BLOCK

Return:
Thought:
Reasoning:
Final Action:
"""