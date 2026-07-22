"use client";

import axios from "axios";
import { useStore } from "../lib/store";
import { useState } from "react";

export default function UploadBox() {
  const setDetection = useStore((s) => s.setDetection);
  const addLog = useStore((s) => s.addLog);
  const isBlocked = useStore((s) => s.isBlocked); // 🔥 FIX
  const systemId = useStore((s) => s.systemId);

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [popup, setPopup] = useState(null);

  // 🔥 MAIN UPLOAD FUNCTION
  const handleUpload = async (file) => {
    if (!file) return;

    // 🚫 BLOCK CHECK
    if (isBlocked) {
      alert("🚫 SYSTEM BLOCKED — Upload Disabled");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);


      const res = await axios.post(
        `http://localhost:8000/analyze?user_id=${systemId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      const result = res.data.data || res.data;

      // 🔥 UPDATE GLOBAL STATE
      setDetection(result);

      // 🔥 POPUP TRIGGER
      const action =
        result.action ||
        (result.final_score > 0.85
          ? "BLOCK"
          : result.final_score > 0.65
          ? "FLAG"
          : result.final_score > 0.45
          ? "ALERT"
          : "ALLOW");

      setPopup(action);

      // ❗ BLOCK popup stays, others disappear
      if (result.action !== "BLOCK") {
        setTimeout(() => setPopup(null), 3000);
      }

      // 🔥 BLOCK SYSTEM
      if (result.action === "BLOCK") {
        useStore.setState({ isBlocked: true });

        localStorage.setItem(`isBlocked_${systemId}`, "true"); // ✅ per system
      }

      // 🔥 LOG SYSTEM
      addLog({
        systemId: systemId,
        time: new Date().toLocaleTimeString(),
        action: result.action,
        score: result.final_score,
        status: result.action,
      });

    } catch (err) {
      console.error("Upload error:", err);

      addLog({
        time: new Date().toLocaleTimeString(),
        action: "Backend Error",
        status: "ALERT",
      });

    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // DRAG HANDLING
  // -------------------------
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`relative group transition-all duration-500 overflow-hidden
      ${loading ? "pointer-events-none" : "pointer-events-auto"}`}
    >
      <label
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 
        border-2 border-dashed rounded-2xl cursor-pointer transition-all
        ${
          dragActive
            ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            : "border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/20"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
              <p className="text-cyan-400 font-mono text-sm animate-pulse">
                ANALYZING NEURAL DATA...
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 mb-4 text-gray-500 group-hover:text-cyan-400 transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold text-white">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-xs text-gray-500 uppercase tracking-widest">
                MP4, WAV, or JPG (MAX. 50MB)
              </p>
            </>
          )}
        </div>

        <input
          type="file"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files[0])}
          disabled={loading}
        />
      </label>

      {/* UI Borders */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />

      {/* 🔥 CYBER POPUP */}
      {popup && (
        <div className="fixed top-10 right-10 z-50 animate-slideIn">
          <div
            className={`
            px-6 py-4 rounded-xl font-mono font-bold text-white text-lg
            shadow-[0_0_25px_rgba(0,0,0,0.5)]
            border backdrop-blur-xl
            ${
              popup === "BLOCK"
                ? "bg-red-500/20 border-red-500 animate-pulse"
                : popup === "ALERT"
                ? "bg-yellow-500/20 border-yellow-500"
                : popup === "FLAG"
                ? "bg-orange-500/20 border-orange-500"
                : "bg-emerald-500/20 border-emerald-500"
            }
          `}
          >
            <div className="tracking-widest animate-glitch">
              {popup === "BLOCK" && "🚫 BLOCKED"}
              {popup === "ALERT" && "⚠️ ALERT"}
              {popup === "FLAG" && "🚩 FLAGGED"}
              {popup === "ALLOW" && "✅ ALLOWED"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}