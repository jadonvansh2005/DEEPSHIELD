from audio_model import predict_audio

def run_audio_model(path):
    score = predict_audio(path)
    return {"audio_score": score}