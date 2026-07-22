"use client";

import { useStore } from "../../../lib/store";
import AgentLog from "../../../components/AgentLog";

export default function Agent() {
  const logs = useStore((s) => s.logs);
  const systemId = useStore((s) => s.systemId);
  const isBlocked = useStore((s) => s.isBlocked);

  // 🔥 IMPORTANT: FILTER LOGS PER SYSTEM

  const safeLogs = logs || [];
  const filteredLogs = logs.filter(
    (l) => l.systemId === systemId
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">AI Agent</h1>
          <p className="text-gray-500 text-sm mt-1">
            Autonomous threat detection & automated response logs.
          </p>
        </div>

        {/* 🔥 STATUS INDICATOR FIXED */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-4 py-2 rounded-full">
          <span className="relative flex h-2 w-2">
            
            {!isBlocked && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}

            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isBlocked ? "bg-red-500" : "bg-emerald-500"
              }`}
            ></span>
          </span>

          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
            {isBlocked ? "System Blocked" : "Active Session"}
          </span>
        </div>
      </div>

      {/* Terminal */}
      <div className="card bg-[#05080a] border-white/10 p-0 overflow-hidden">
        <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
        </div>
        
        <div className="p-6 h-[600px] overflow-y-auto font-mono text-sm custom-scrollbar">
          
          {/* 🔥 USE filteredLogs INSTEAD OF logs */}
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-600">
              <p className="animate-pulse">_ Initializing neural links...</p>
              <p className="text-xs mt-2">No background activity detected.</p>
            </div>
          ) : (
            <div className="space-y-2">
              
              {/* 🔥 USE filteredLogs HERE */}
              {filteredLogs.map((l, i) => (
                <div key={i} className="group flex gap-4 py-1 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <span className="text-cyan-500/50 min-w-[80px]">{l.time}</span>
                  <span className="text-gray-400">→</span>
                  <AgentLog action={l.action} status={l.status || "INFO"} />
                </div>
              ))}

              <div className="animate-pulse text-cyan-400 mt-4">_</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}