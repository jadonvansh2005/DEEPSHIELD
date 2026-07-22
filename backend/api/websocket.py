from fastapi import WebSocket, WebSocketDisconnect
import json
from agent_engine import run_agent

async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("🟢 Client Connected")

    try:
        while True:
            data = await websocket.receive_text()
            parsed = json.loads(data)

            file_path = parsed.get("file_path")
            file_type = parsed.get("file_type")
            user_id = parsed.get("user_id")

            # 🔥 RUN AGENT
            result = run_agent(file_path, file_type, user_id)

            # 🔥 SEND RESULT BACK
            await websocket.send_json(result)  # ✅ better than send_text

    except WebSocketDisconnect:
        print("🔴 Client Disconnected")

    except Exception as e:
        print("❌ WebSocket Error:", e)