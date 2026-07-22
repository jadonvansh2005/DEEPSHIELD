class AgenticReasoning:

    def reason(self, video_score, audio_score):
        
        result = {}

        # 🔍 1. OBSERVATION
        result["observation"] = {
            "video_score": video_score,
            "audio_score": audio_score
        }

        # 🧠 2. ANALYSIS (core intelligence)
        diff = abs(video_score - audio_score)

        if video_score > 0.8 and audio_score < 0.3:
            analysis = "Video likely fake, audio real → visual deepfake"
            trust = "audio"

        elif audio_score > 0.8 and video_score < 0.3:
            analysis = "Audio likely fake, video real → voice clone"
            trust = "video"

        elif video_score > 0.8 and audio_score > 0.8:
            analysis = "Both video and audio fake → strong deepfake"
            trust = "none"

        elif video_score < 0.3 and audio_score < 0.3:
            analysis = "Both video and audio look real"
            trust = "both"

        else:
            analysis = "Uncertain case (conflict or medium confidence)"
            trust = "none"

        result["analysis"] = analysis
        result["trust"] = trust

        # 📊 3. CONFIDENCE (smart logic)
        confidence = max(video_score, audio_score)
        result["confidence"] = confidence

        # 🎯 4. FINAL DECISION
        if confidence > 0.8:
            decision = "FAKE"
        elif confidence > 0.5:
            decision = "SUSPICIOUS"
        else:
            decision = "REAL"

        result["decision"] = decision

        return result