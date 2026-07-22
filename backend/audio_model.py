import torch
import torch.nn as nn
import soundfile as sf
from transformers import Wav2Vec2Model

class AudioPredictor:
    def __init__(self, model_path, device="cpu"):
        self.device = device

        # Model
        self.model = self.build_model()
        self.model.load_state_dict(torch.load(model_path, map_location=device))
        self.model.to(device)
        self.model.eval()

    def build_model(self):
        class AudioModel(nn.Module):
            def __init__(self):
                super().__init__()
                self.wav2vec = Wav2Vec2Model.from_pretrained(
                    r"D:\wav2vec_local",   # 👈 local folder
                    local_files_only=True
                )
                self.classifier = nn.Linear(768, 2)

            def forward(self, x):
                outputs = self.wav2vec(x)
                pooled = outputs.last_hidden_state.mean(dim=1)
                return self.classifier(pooled)

        return AudioModel()

    def preprocess(self, file_path):
        waveform, sr = sf.read(file_path)
        waveform = torch.tensor(waveform).float()

        if len(waveform.shape) > 1:
            waveform = waveform.mean(dim=1)

        max_len = 16000 * 3
        if waveform.shape[0] > max_len:
            waveform = waveform[:max_len]
        else:
            waveform = torch.nn.functional.pad(waveform, (0, max_len - waveform.shape[0]))

        return waveform.unsqueeze(0)

    def predict(self, file_path):
        print(f"🎧 Processing audio: {file_path}")

        input_audio = self.preprocess(file_path).to(self.device)

        with torch.no_grad():
            output = self.model(input_audio)
            probs = torch.softmax(output, dim=1)

        fake_score = probs[0][1].item()

        return fake_score   # ❌ NO CLIPPING

audio_model = None

def predict_audio(audio_path):
    global audio_model

    if audio_model is None:
        print("🚀 Loading Audio Model...")

        audio_model = AudioPredictor(
            model_path="D:\\DEEPFAKE\\experiments\\AI_models\\audio\\wav2vec_audio.pth",  # 🔧 CHANGE PATH
            device="cpu"
        )

    return audio_model.predict(audio_path)