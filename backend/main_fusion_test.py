from video_model import VideoDeepfakeModel
from audio_model import AudioPredictor
from multimodal_fusion import DeepfakeFusionSystem
import os
import uuid

DEVICE = "cpu"

# 🎧 Extract audio using FFmpeg
def extract_audio(video_path):
    temp_audio = f"temp_{uuid.uuid4().hex}.wav"

    command = f'ffmpeg -i "{video_path}" -q:a 0 -map a "{temp_audio}" -y'
    os.system(command)

    return temp_audio

# ✅ LOAD MODELS
video_model = VideoDeepfakeModel(
    r"C:\Users\vansh\OneDrive\Desktop\Deepfake\experiments\AI_models\video\efficientnet_video_pytorch.pth"
)

audio_model = AudioPredictor(
    r"C:\Users\vansh\OneDrive\Desktop\Deepfake\experiments\AI_models\audio\wav2vec_audio.pth"
)

# ✅ CREATE FUSION SYSTEM
fusion_system = DeepfakeFusionSystem(video_model, audio_model, DEVICE)

# 🎥 INPUT VIDEO ONLY
video_path = r"C:\Users\vansh\Downloads\Video_Generation_Request_Fulfilled.mp4"

# 🎧 AUTO EXTRACT AUDIO
audio_path = extract_audio(video_path)

# 🚀 RUN SYSTEM
result = fusion_system.predict(video_path, audio_path)

# 🧹 CLEAN TEMP FILE
if os.path.exists(audio_path):
    os.remove(audio_path)

# import os
# print(os.path.exists(r"C:\Users\vansh\OneDrive\Desktop\Deepfake\experiments\AI_models\video\efficientnet_video_tf.h5"))




# bro i have question in my mind that my both audio and video model separate work properly but during fusion its result is worst why and IInd question is why we upload audio and video path separate in main_fusion.py i want to say we can upload a video ( in which audio is present) then our multimodal is detect the result weather which is fake video or audio in which % 

