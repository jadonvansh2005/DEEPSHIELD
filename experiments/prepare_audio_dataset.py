import os
import subprocess

# 🔥 1. The exact source path based on your screen recording
SOURCE_ROOT = r"C:\Users\vansh\Downloads\archive\FakeAVCeleb_v1.2\FakeAVCeleb_v1.2"
DEST_ROOT = r"datasets\audio_dataset"

# 🔥 2. THE CAUSE OF THE CRASH: Verify this path!
FFMPEG_PATH = r"C:\Users\vansh\Downloads\ffmpeg-2026-02-23-git-7b15039cdb-full_build\ffmpeg-2026-02-23-git-7b15039cdb-full_build\bin\ffmpeg.exe"

REAL_FOLDERS = ["RealVideo-RealAudio", "FakeVideo-RealAudio"]
FAKE_FOLDERS = ["RealVideo-FakeAudio", "FakeVideo-FakeAudio"]

def extract_audio(src_folder, dest_folder):
    if not os.path.exists(src_folder):
        print(f"⚠️ Skipping - Folder not found: {src_folder}")
        return

    # os.walk is perfect here because it searches inside "Caucasian (American)", etc.
    for root, dirs, files in os.walk(src_folder):
        for file in files:
            if file.lower().endswith(".mp4"):
                video_path = os.path.join(root, file)

                # Generate .wav filename
                base_name = os.path.splitext(file)[0]
                audio_name = base_name + ".wav"
                audio_path = os.path.join(dest_folder, audio_name)

                # Avoid overwriting duplicates
                counter = 1
                while os.path.exists(audio_path):
                    audio_name = f"{base_name}_{counter}.wav"
                    audio_path = os.path.join(dest_folder, audio_name)
                    counter += 1

                command = [
                    FFMPEG_PATH,
                    "-y",                 # overwrite automatically
                    "-i", video_path,     # input video
                    "-ar", "16000",       # 16kHz sample rate (best for Resemblyzer)
                    "-ac", "1",           # Mono audio
                    "-loglevel", "error", # Keep terminal clean, only show errors
                    audio_path
                ]

                print(f"Extracting: {file} -> {audio_name}")
                subprocess.run(command)

def main():
    # 🛑 THE FAIL-SAFE: Stop the code if FFmpeg is missing
    if not os.path.exists(FFMPEG_PATH):
        print("\n❌ CRITICAL ERROR: Windows cannot find FFmpeg!")
        print(f"I looked here: {FFMPEG_PATH}")
        print("Please open File Explorer and make sure 'ffmpeg.exe' is actually in that folder.\n")
        return

    # Create destination folders
    os.makedirs(os.path.join(DEST_ROOT, "real"), exist_ok=True)
    os.makedirs(os.path.join(DEST_ROOT, "fake"), exist_ok=True)

    print("--- Extracting REAL audio ---")
    for folder in REAL_FOLDERS:
        extract_audio(os.path.join(SOURCE_ROOT, folder),
                      os.path.join(DEST_ROOT, "real"))

    print("\n--- Extracting FAKE audio ---")
    for folder in FAKE_FOLDERS:
        extract_audio(os.path.join(SOURCE_ROOT, folder),
                      os.path.join(DEST_ROOT, "fake"))

    print("\n✅ Audio dataset prepared successfully!")

if __name__ == "__main__":
    main()