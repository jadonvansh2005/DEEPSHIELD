import { useEffect, useState } from "react";

export default function useWebSocket(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ws;

    try {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("🟢 WebSocket Connected");
      };

      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);
        } catch (err) {
          console.error("Invalid JSON:", err);
        }
      };

      ws.onerror = () => {
        console.log("⚠️ WebSocket Error (server issue)");
      };

      ws.onclose = () => {
        console.log("🔴 WebSocket closed");
      };

    } catch (err) {
      console.error("WS Init Error:", err);
    }

    return () => {
      if (ws) ws.close();
    };
  }, [url]);

  return data;
}