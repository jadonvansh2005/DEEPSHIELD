# import torch
# import torch.nn as nn
# import torchvision.models as models
# from torchvision.models import EfficientNet_B0_Weights
# import torchvision.transforms as transforms
# from PIL import Image
# import cv2

# class VideoDeepfakeModel:
#     def __init__(self, model_path, device="cpu"):
#         self.device = device

#         # ✅ Load EfficientNet
#         self.model = models.efficientnet_b0(weights=EfficientNet_B0_Weights.DEFAULT)
#         self.model.classifier[1] = nn.Linear(self.model.classifier[1].in_features, 2)

#         # ✅ Load trained weights
#         self.model.load_state_dict(torch.load(model_path, map_location=device))
#         self.model.to(device)
#         self.model.eval()

#         # ✅ Transform
#         self.transform = transforms.Compose([
#             transforms.Resize((224, 224)),
#             transforms.ToTensor(),
#             transforms.Normalize([0.485, 0.456, 0.406],
#                                  [0.229, 0.224, 0.225])
#         ])

#     # 🎥 VIDEO PREDICTION
#     def predict(self, video_path):
#         cap = cv2.VideoCapture(video_path)

#         batch_size = 16      # 🔥 memory control
#         frame_skip = 5       # 🔥 speed optimization

#         batch = []
#         all_probs = []
#         count = 0

#         while cap.isOpened():
#             ret, frame = cap.read()
#             if not ret:
#                 break

#             # 🔥 skip frames (important)
#             if count % frame_skip != 0:
#                 count += 1
#                 continue

#             frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             frame = Image.fromarray(frame)
#             frame = self.transform(frame)

#             batch.append(frame)
#             count += 1

#             # 🔥 process batch
#             if len(batch) == batch_size:
#                 batch_tensor = torch.stack(batch).to(self.device)

#                 with torch.no_grad():
#                     outputs = self.model(batch_tensor)
#                     probs = torch.softmax(outputs, dim=1)

#                 all_probs.append(probs.cpu())
#                 batch = []

#         cap.release()

#         # 🔥 leftover frames
#         if len(batch) > 0:
#             batch_tensor = torch.stack(batch).to(self.device)

#             with torch.no_grad():
#                 outputs = self.model(batch_tensor)
#                 probs = torch.softmax(outputs, dim=1)

#             all_probs.append(probs.cpu())

#         # ❌ safety check
#         if len(all_probs) == 0:
#             print("⚠️ No frames processed!")
#             return 0.0

#         # 🔥 combine predictions
#         all_probs = torch.cat(all_probs, dim=0)
#         avg_prediction = torch.mean(all_probs, dim=0)

#         fake_score = avg_prediction[1].item()
#         fake_score = max(0.01, min(0.99, fake_score))
#         return fake_score
    
import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import cv2

class VideoDeepfakeModel:
    def __init__(self, model_path, device="cpu"):
        self.device = device

        # ✅ IMPORTANT: match training config
        self.model = models.efficientnet_b0(weights=None)
        self.model.classifier[1] = nn.Linear(
            self.model.classifier[1].in_features, 2
        )

        # ✅ Load weights
        self.model.load_state_dict(torch.load(model_path, map_location=device))
        self.model.to(device)
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406],
                                 [0.229, 0.224, 0.225])
        ])

    def predict(self, video_path):
        print(f"🎥 Processing video: {video_path}")

        cap = cv2.VideoCapture(video_path)

        batch_size = 16
        frame_skip = 5

        batch = []
        all_probs = []
        count = 0
        frame_count = 0

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            if count % frame_skip != 0:
                count += 1
                continue

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = Image.fromarray(frame)
            frame = self.transform(frame)

            batch.append(frame)
            count += 1
            frame_count += 1

            if len(batch) == batch_size:
                batch_tensor = torch.stack(batch).to(self.device)

                with torch.no_grad():
                    outputs = self.model(batch_tensor)
                    probs = torch.softmax(outputs, dim=1)

                all_probs.append(probs.cpu())
                batch = []

        cap.release()

        if len(batch) > 0:
            batch_tensor = torch.stack(batch).to(self.device)

            with torch.no_grad():
                outputs = self.model(batch_tensor)
                probs = torch.softmax(outputs, dim=1)

            all_probs.append(probs.cpu())

        if len(all_probs) == 0:
            print("⚠️ No frames processed!")
            return 0.0

        print(f"🎞️ Frames processed: {frame_count}")

        all_probs = torch.cat(all_probs, dim=0)
        print("\n🧪 Sample probs (first 5 frames):")
        print(all_probs[:5])
        avg_prediction = torch.mean(all_probs, dim=0)

        fake_score = avg_prediction[0].item()

        frame_fake_scores = all_probs[:, 0].tolist()

        return fake_score, frame_fake_scores
    

video_model = None

def predict_video(video_path):
    global video_model

    if video_model is None:
        print("🚀 Loading Video Model...")

        video_model = VideoDeepfakeModel(
            model_path="D:\\DEEPFAKE\\experiments\\AI_models\\video\\efficientnet_video_pytorch.pth",  # 🔧 CHANGE PATH
            device="cpu"
        )

    return video_model.predict(video_path)