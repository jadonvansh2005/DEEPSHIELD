import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.websocket import websocket_endpoint



# 🔥 Fix import issues (VERY IMPORTANT)
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from api.routes import router

app = FastAPI(
    title="Deepfake Detection API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.websocket("/ws")(websocket_endpoint)

# ✅ Root test endpoint (for debugging)
@app.get("/")
def home():
    return {"message": "Server is running 🚀"}

# ✅ Include routes
app.include_router(router)