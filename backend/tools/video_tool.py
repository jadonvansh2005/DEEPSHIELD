from video_model import predict_video

def run_video_model(path):
    score = predict_video(path)
    return {"video_score": score}