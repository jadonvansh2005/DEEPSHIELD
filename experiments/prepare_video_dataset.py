import os
import shutil

# Change this to your frames folder path
SOURCE_ROOT = r"C:\Users\vansh\Downloads\archive\FakeAVCeleb_v1.2\video"
DEST_ROOT = r"datasets\video_dataset\train"

REAL_FOLDERS = ["RealVideo-RealAudio", "RealVideo-FakeAudio"]
FAKE_FOLDERS = ["FakeVideo-RealAudio", "FakeVideo-FakeAudio"]

def copy_images(src_folder, dest_folder):
    for root, dirs, files in os.walk(src_folder):
        for file in files:
            if file.lower().endswith((".jpg", ".png", ".jpeg")):
                src_path = os.path.join(root, file)
                dest_path = os.path.join(dest_folder, file)

                # Rename if duplicate exists
                counter = 1
                while os.path.exists(dest_path):
                    name, ext = os.path.splitext(file)
                    dest_path = os.path.join(dest_folder, f"{name}_{counter}{ext}")
                    counter += 1

                shutil.copy2(src_path, dest_path)

def main():
    os.makedirs(os.path.join(DEST_ROOT, "real"), exist_ok=True)
    os.makedirs(os.path.join(DEST_ROOT, "fake"), exist_ok=True)

    print("Copying REAL video frames...")
    for folder in REAL_FOLDERS:
        copy_images(os.path.join(SOURCE_ROOT, folder),
                    os.path.join(DEST_ROOT, "real"))

    print("Copying FAKE video frames...")
    for folder in FAKE_FOLDERS:
        copy_images(os.path.join(SOURCE_ROOT, folder),
                    os.path.join(DEST_ROOT, "fake"))

    print("Video dataset prepared successfully!")

if __name__ == "__main__":
    main()