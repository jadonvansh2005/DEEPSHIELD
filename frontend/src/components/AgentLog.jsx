"use client";

import { useStore } from "../lib/store";
import StatusBadge from "./StatusBadge";

export default function AgentLog() {
  const logs = useStore((s) => s.logs);

  return (
    <div className="card bg-[#0d121c]/40 border-white/5 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
          Neural Activity Log
        </h2>
        <span className="text-[10px] text-gray-500 font-mono">
          TOTAL_RECORDS: {logs.length}
        </span>
      </div>

      {logs.length === 0 ? (
        <div className="py-10 text-center border border-dashed border-white/5 rounded-xl">
          <p className="text-gray-500 text-sm font-mono animate-pulse">
            &gt; AWAITING_INBOUND_STREAM_
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {/* Header Row */}
          <div className="grid grid-cols-4 px-4 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-white/5">
            <span>Timestamp</span>
            <span className="col-span-2">System Intelligence / Action</span>
            <span className="text-right">Decision</span>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {logs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center px-4 py-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.03] group"
              >
                {/* Time */}
                <span className="text-xs font-mono text-gray-400 group-hover:text-cyan-500 transition-colors">
                  {log.time}
                </span>

                {/* Log Content */}
                <span className="col-span-2 text-xs text-gray-300 font-medium">
                  {log.message || `Deepfake analysis complete: ${log.score}% match`}
                </span>

                {/* Status Badge */}
                <div className="flex justify-end">
                  <StatusBadge status={log.status || log.action} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}