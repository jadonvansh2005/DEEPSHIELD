"use client";

import { useState } from "react";
import { useStore } from "../lib/store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const login = useStore((s) => s.register); // reuse existing register
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const router = useRouter();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleRegister = () => {
    if (!name || !id) {
      alert("System requires initialization parameters.");
      return;
    }

    login(name, id);

    // 🔥 redirect after login
    router.push("/console/upload");
  };

  return (
    <div className="relative min-h-screen pb-40">
      {/* 1. ATMOSPHERIC NEURAL BACKGROUND */}
      <div className="bg-neural-mesh" />

      <div className="max-w-[1440px] mx-auto px-8 pt-6">
        
        {/* HEADER: Floating Status Badge */}
        <div className="flex justify-center mb-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New: AI Deepfake Analytics v2.0
          </motion.div>
        </div>

        {/* MAIN DASHBOARD HUB */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Cinematic Branding & HUD Visualization */}
          <div className="xl:col-span-8 space-y-10">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-brand-large cursor-default hover:tracking-normal transition-all duration-700"
            >
              DeepShield
            </motion.h1>

            {/* LARGE HUD VISUALIZATION */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full aspect-[21/9] glass-panel overflow-hidden group border-emerald-500/10"
            >
               <img 
                 src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000" 
                 className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-1000"
                 alt="Neural Surveillance Feed"
               />
               
               {/* HUD OVERLAY */}
               <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between font-mono text-[10px] text-emerald-400/60 uppercase tracking-widest">
                    <p>[ NODE_SURVEILLANCE_ACTIVE ]</p>
                    <p>CORE_SYNC: {isAuthenticated ? "100%" : "00%"}</p>
                  </div>
                  
                  {/* Moving HUD Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-24 w-full animate-hud-scan" />
                  
                  <div className="flex items-end justify-between">
                     <div className="space-y-1">
                        <h2 className="text-white font-black text-2xl uppercase tracking-tighter">Analysis Terminal</h2>
                        <p className="text-emerald-500/50 font-mono text-[9px] uppercase tracking-widest">Protocol_X_Neural_Link</p>
                     </div>
                     <div className="relative w-20 h-20 flex items-center justify-center">
                        <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping" />
                        <div className="w-14 h-14 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin" />
                     </div>
                  </div>
               </div>
            </motion.div>

            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed border-l-2 border-emerald-500/30 pl-6 font-light">
              DeepShield provides a comprehensive ecosystem for real-time deepfake analysis, biometric verification, and multi-modal authenticity monitoring.
            </p>
          </div>

       {/* =========================================
        RIGHT SIDE: MEGA FLOATING LOGO (MAX SIZE)
        ========================================== */}
          <div className="xl:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex justify-center relative z-20 mt-[-60px] md:mt-[-100px] mb-[-40px]" 
              // mt-[-100px] pulls it way up into that wasted space
            >
              <motion.div 
                className="relative group cursor-crosshair"
                whileHover={{ scale: 1.15, rotateY: 15 }} // Sophisticated 3D hover
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Dynamic Background Glow - Intensifies on Hover */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[80px] animate-pulse scale-150 group-hover:bg-emerald-500/40 transition-colors duration-500" />
                
                {/* THE LOGO - Now significantly larger (w-80 / h-80) */}
                <motion.img 
                  src="/image/logo.png" 
                  alt="DeepShield Logo"
                  className="w-72 h-72 md:w-80 md:h-80 object-contain relative z-10 
                            drop-shadow-[0_0_40px_rgba(16,185,129,0.5)] 
                            group-hover:drop-shadow-[0_0_60px_rgba(16,185,129,0.8)] 
                            transition-all duration-500"
                  animate={{ 
                    y: [0, -15, 0],
                    filter: ["drop-shadow(0 0 20px rgba(16,185,129,0.4))", "drop-shadow(0 0 40px rgba(16,185,129,0.6))", "drop-shadow(0 0 20px rgba(16,185,129,0.4))"]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Orbiting Tech Rings - Added a second ring for more complexity */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-emerald-500/10 rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-dashed border-emerald-500/5 rounded-full animate-spin-reverse pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* AUTH BOX */}
            {!isAuthenticated ? (
              <motion.div 
                whileHover={{ y: -5, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                className="glass-panel p-8 space-y-8"
              >
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">
                    Initialize System
                  </h3>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">
                    Sync credentials with neural hub
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
                      System_Name
                    </label>
                    <input
                      className="auth-input"
                      placeholder="CRX-Terminal-01"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
                      Access_Key
                    </label>
                    <input
                      type="password"
                      className="auth-input"
                      placeholder="••••••••"
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleRegister}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95 uppercase tracking-widest text-xs"
                  >
                    Authenticate
                  </button>

                  {/* 🔥 RESET BUTTON */}
                  <button 
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full mt-2 border border-red-500 text-red-400 py-2 rounded-xl text-xs"
                  >
                    Reset System
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-10 text-center border-emerald-500/30 bg-emerald-500/5">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                  <span className="text-emerald-500 text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-white font-bold uppercase tracking-widest">Link Secured</h3>
                <p className="text-gray-500 text-[10px] mt-2 uppercase font-mono tracking-tighter">Terminal_Sync_Complete</p>
              </div>
            )}
          </div>
        </div>

        {/* 🚀 INNOVATIVE FEATURE STRIP - Shifted Down ~1cm (mt-10) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 relative z-10">
          {[
            { 
              title: "Neural Agent", 
              label: "PROTOCOL_01", 
              desc: "Autonomous LLM threat detection identifying synthetic speech and linguistic anomalies.",
              icon: (
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            { 
              title: "Live Monitor", 
              label: "PROTOCOL_02", 
              desc: "Stream monitoring utilizing RVC and Wav2Lip detection for synchronization integrity.",
              icon: (
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )
            },
            { 
              title: "Forensic Core", 
              label: "PROTOCOL_03", 
              desc: "Artifact scanning identifying GAN-generated textures and sub-pixel inconsistencies.",
              icon: (
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              )
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ 
                y: -10, // Slight hover lift
                borderColor: 'rgba(16, 185, 129, 0.4)', 
                backgroundColor: 'rgba(16, 185, 129, 0.03)',
              }}
              className="glass-panel p-6 group cursor-help transition-all duration-500 relative overflow-hidden"
            >
              <div className="text-emerald-500 font-mono text-[9px] mb-4 uppercase tracking-[0.4em] font-bold">
                {item.label}
              </div>
              
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h4>
              
              <p className="text-gray-500 text-xs leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                {item.desc}
              </p>

              {/* Interactive Bottom Glow Line */}
              <div className="mt-4 h-[1px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* 🧩 DEEP DIVE CONTENT (Updated with Hover Effects) */}
        <section id="technology" className="mt-40 space-y-16 text-gray-400 leading-relaxed max-w-6xl mx-auto">
          
          <motion.div 
             whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.01)' }}
             className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center p-8 rounded-[32px] border border-white/5 transition-all duration-500 group"
          >
            <div className="col-span-2 space-y-4">
               <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-emerald-300 transition-colors">Forensic Architecture</span>
               <h3 className="text-3xl text-white font-semibold tracking-tight">How Neural Shield Verification Works</h3>
               <p className="text-gray-500">Our proprietary engine leverages a transformer-based model architecture trained on diverse multimodal datasets, analyzing over 12,000 biometric and environmental parameters in parallel to detect sub-pixel anomalies.</p>
            </div>
            <div className="h-40 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-emerald-500/20 transition-all shadow-inner" />
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.01)' }}
             className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center p-8 rounded-[32px] border border-white/5 transition-all duration-500 group"
          >
            <div className="h-40 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-emerald-500/20 transition-all shadow-inner order-last md:order-first" />
            <div className="col-span-2 space-y-4">
               <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-emerald-300 transition-colors">Neural Mesh Stack</span>
               <h3 className="text-3xl text-white font-semibold tracking-tight">Enterprise Technology & AI Stack</h3>
               <p className="text-gray-500">DeepShield utilizes an Adversarial Analysis Framework (AAF) that constantly pits generative models against our detection cores. By combining lip-sync analysis and audio spectral fingerprinting, we ensure total protection.</p>
            </div>
          </motion.div>

          <div id="enterprise" className="max-w-4xl mx-auto text-center space-y-6 pt-20">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ duration: 4, repeat: Infinity }}
              className="relative inline-block"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <div className="relative p-6 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md group hover:border-emerald-500/50 transition-colors">
                <svg 
                  className="w-12 h-12 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Internal spinning circuit line */}
                <div className="absolute inset-0 border-t-2 border-emerald-500/10 rounded-full animate-spin-slow" />
              </div>
            </motion.div>
            
            <h3 className="text-4xl text-white font-bold tracking-tight">Securing the Institutional Future</h3>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto italic">
              DeepShield acts as a critical infrastructure layer, providing national defense-grade protocols to restore digital trust.
            </p>
          </div>
          </section>

        {/* TECH STACK FOOTER */}
        <div className="flex flex-wrap justify-center gap-12 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000 py-20 border-t border-white/5 mt-20">
           {['PyTorch', 'FastAPI', 'NextJS', 'LangChain', 'OpenCV'].map(tech => (
             <span key={tech} className="font-black text-2xl tracking-tighter uppercase text-white">{tech}</span>
           ))}
        </div>
      </div>
    </div>
  );
}