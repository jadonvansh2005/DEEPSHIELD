from fastapi import APIRouter, UploadFile, File
import shutil, os
from agent_engine import run_agent

router = APIRouter()
UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    user_id: str = "user_1"   # 🔥 ADD THIS
):
    path = os.path.join(UPLOAD_DIR, file.filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if file.filename.endswith(".mp4"):
        file_type = "video"
    elif file.filename.endswith(".wav"):
        file_type = "audio"
    else:
        file_type = "image"

    result = run_agent(path, file_type, user_id)

    return {"data": result}