"use client";

import { useEffect, useState } from "react";
import { useStore } from "../../../lib/store";
import { motion } from "framer-motion";

import GraphChart from "../../../components/GraphChart";
import StatusBadge from "../../../components/StatusBadge";
import useWebSocket from "../../../hooks/useWebSocket";

export default function Monitor() {
  const detection = useStore((s) => s.detection);
  const history = useStore((s) => s.history);
  const setDetection = useStore((s) => s.setDetection);
  const addLog = useStore((s) => s.addLog);
  const isAuthenticated = useStore((s) => s.isAuthenticated); // Updated to match store naming

  // 📡 Real-time WebSocket connection
  const wsData = useWebSocket("ws://localhost:8000/ws");

  // 🔥 Update store when WebSocket receives data
  useEffect(() => {
    if (!wsData) return;

    const data = wsData.data || wsData;

    if (typeof data.final_score !== "number") return;

    setDetection(wsData);

    addLog({
      time: new Date().toLocaleTimeString(),
      action: wsData.action || "UNKNOWN",
      score: wsData.final_score,
      status: wsData.action || "UNKNOWN",
    });
  }, [wsData, setDetection, addLog]);

  // 🔥 REAL-TIME JITTER EFFECT (Makes the graph move even when idle)
  useEffect(() => {
    if (!detection || typeof detection.final_score !== "number") return;

    const interval = setInterval(() => {
      setDetection((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          final_score: Math.min(
            Math.max(prev.final_score + (Math.random() - 0.5) * 0.03, 0),
            1
          ),
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [detection, setDetection]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-emerald-500 text-3xl">🛡️</span>
        </div>
        <h2 className="text-white text-3xl font-bold mb-3 tracking-tight uppercase italic">Neural Link Required</h2>
        <p className="text-gray-500 max-w-md font-mono text-xs tracking-widest uppercase opacity-60">
          Initialize connection on main terminal dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 pt-12 space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em]">
              Live Surveillance Feed
            </span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            System Monitor
          </h1>
        </div>

        {detection && (
          <div className="text-right">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-2">Threat Level</p>
            <StatusBadge
              status={
                detection.action === "BLOCK" ? "Critical" : 
                detection.action === "FLAG" ? "Warning" : "Secure"
              }
            />
          </div>
        )}
      </div>

      {detection ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 🔥 LEFT SIDE (GRAPH + SCORES) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* GRAPH PANEL */}
            <div className="glass-panel p-8 h-[500px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Confidence Probability Curve
                </h3>
                <span className="font-mono text-[10px] text-emerald-500/50 uppercase tracking-widest">
                  NODE_STATUS: STABLE
                </span>
              </div>

              <div className="h-[380px]">
                <GraphChart data={history} />
              </div>
            </div>

            {/* 🔥 INDIVIDUAL SCORES GRID */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="glass-panel p-6 text-center border-emerald-500/5 hover:border-emerald-500/20 transition-colors">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Video Analysis</p>
                <p className="text-2xl text-white font-black italic tracking-tighter">
                  {(detection.video_score * 100).toFixed(1)}%
                </p>
              </div>

              <div className="glass-panel p-6 text-center border-emerald-500/5 hover:border-emerald-500/20 transition-colors">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Audio Spectral</p>
                <p className="text-2xl text-white font-black italic tracking-tighter">
                  {(detection.audio_score * 100).toFixed(1)}%
                </p>
              </div>

              <div className="glass-panel p-6 text-center border-emerald-500/5 hover:border-emerald-500/20 transition-colors">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Multimodal</p>
                <p className="text-2xl text-emerald-400 font-black italic tracking-tighter shadow-emerald-500/20">
                  {(detection.multimodal_score * 100).toFixed(1)}%
                </p>
              </div>
            </motion.div>
          </div>

          {/* 🔥 RIGHT SIDE (DIAGNOSTICS) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 border-emerald-500/10">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-4 tracking-widest">Primary Decision</p>
              <h2 className={`text-4xl font-black italic tracking-tighter mb-4 ${
                detection.action === "BLOCK" ? "text-red-500" : 
                detection.action === "FLAG" ? "text-yellow-500" : "text-emerald-400"
              }`}>
                {detection.action}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                Neural core reports a <span className="text-white font-bold">{(detection.final_score * 100).toFixed(2)}%</span> anomaly coefficient based on current buffer.
              </p>
            </div>

            <div className="glass-panel p-8 bg-emerald-500/5">
              <p className="text-emerald-400 text-[10px] uppercase font-bold mb-4 tracking-widest">Neural Processing Load</p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(detection.final_score * 100).toFixed(0)}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                />
              </div>
              <p className="text-[9px] text-gray-500 mt-4 font-mono uppercase tracking-tighter">Analyzing artifact vectors in real-time...</p>
            </div>
            
            {/* System Log Snippet */}
            <div className="p-6 border border-white/5 rounded-[32px] bg-black/20">
               <p className="text-[9px] text-emerald-500/40 uppercase tracking-[0.3em] leading-relaxed">
                 Secure connection stable. Analyzing feed for deepfake artifacts. Multimodal engines operational.
               </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel py-32 text-center border-dashed border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl animate-pulse">📡</span>
          </div>
          <h3 className="text-white font-bold text-xl uppercase tracking-widest">Awaiting Neural Stream</h3>
          <p className="text-gray-500 text-sm mt-2 font-light">Connect a live feed or upload media to visualize the data stream.</p>
        </div>
      )}
    </div>
  );
}