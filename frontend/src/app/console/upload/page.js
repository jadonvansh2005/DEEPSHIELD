"use client";

import { useEffect, useState } from "react"; // Added hooks
import { useStore } from "../../../lib/store";
import UploadBox from "../../../components/UploadBox";

export default function Upload() {
  // 1. Get States from Store
  const isAuthenticated = useStore((s) => s.isAuthenticated); // Note: Your Dashboard uses 'isRegistered'
  const detection = useStore((s) => s.detection);
  
  // 2. Popup Visibility Logic
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (detection) {
      setShowPopup(true);

      // ⏱ Auto hide after 3 sec
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [detection]);

  // 🔐 ACCESS CONTROL (Matches your Dashboard theme)
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-emerald-500 text-3xl">🛡️</span>
        </div>
        <h2 className="text-white text-3xl font-bold mb-3 tracking-tight">System Locked</h2>
        <p className="text-gray-500 max-w-md leading-relaxed">
          Neural link not established. Please initialize your system on the dashboard to access the Forensic Terminal.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 pt-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 🚀 PART 1 — CYBER POPUP (AUTO DISAPPEAR + ANIMATION) */}
      {showPopup && detection && (
        <div
          className={`fixed top-10 right-10 z-[100] px-8 py-5 rounded-xl 
          text-white font-black text-xl tracking-[0.2em]
          animate-pulse border-2 shadow-[0_0_40px]
          flex items-center gap-3 transition-all duration-500
          ${
            detection.action === "BLOCK"
              ? "bg-red-600 border-red-300 shadow-red-500/50"
              : detection.action === "ALERT"
              ? "bg-yellow-500 border-yellow-200 shadow-yellow-400/50"
              : detection.action === "FLAG"
              ? "bg-orange-500 border-orange-200 shadow-orange-400/50"
              : "bg-emerald-500 border-emerald-200 shadow-emerald-400/50"
          }`}
        >
          <span className="animate-ping">⚡</span> 
          {detection.action} 
          <span className="animate-ping">⚡</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-12 bg-emerald-500"></span>
          <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em]">
            Neural Terminal Protocol
          </span>
        </div>

        <h1 className="text-brand-large text-6xl lg:text-7xl">
          Upload & <span className="text-emerald-400">Analyze</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg max-w-2xl font-light italic border-l-2 border-emerald-500/20 pl-6">
          "Executing multi-modal deepfake verification across visual artifacts and audio frequency spectrums."
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-40">
        
        {/* Upload Terminal */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-1 border-white/5 overflow-hidden">
             <UploadBox />
          </div>
        </div>

        {/* Sidebar Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Analysis Stack
            </h3>

            <ul className="space-y-4 font-mono text-[11px] text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-3 group">
                <span className="group-hover:text-white transition-colors">Visual_Artifacts</span>
                <span className="text-emerald-500 font-bold tracking-widest">READY</span>
              </li>

              <li className="flex justify-between border-b border-white/5 pb-3 group">
                <span className="group-hover:text-white transition-colors">Spectral_Audio</span>
                <span className="text-emerald-500 font-bold tracking-widest">READY</span>
              </li>

              <li className="flex justify-between group">
                <span className="group-hover:text-white transition-colors">Meta_Cryptographic</span>
                <span className="text-emerald-500 font-bold tracking-widest">READY</span>
              </li>
            </ul>
          </div>
          
          {/* Subtle decoration for the sidebar */}
          <div className="p-8 border border-white/5 rounded-[32px] bg-emerald-500/5">
             <p className="text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] leading-relaxed">
               Secure Neural Link Established. All forensics engines are operational.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}