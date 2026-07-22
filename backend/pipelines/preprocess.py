import subprocess
import os

def extract_audio(video_path):
    audio_path = video_path.replace(".mp4", ".wav")

    command = [
        "ffmpeg",
        "-i", video_path,
        "-vn",                # no video
        "-acodec", "pcm_s16le",
        "-ar", "16000",       # sample rate (important for model)
        "-ac", "1",           # mono
        audio_path,
        "-y"
    ]

    subprocess.run(
        command,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    return audio_path