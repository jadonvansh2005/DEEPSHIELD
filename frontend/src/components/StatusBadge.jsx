export default function StatusBadge({ status }) {
  // Mapping statuses to specific glow colors
  const variants = {
    BLOCK: "text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    FLAG: "text-orange-400 border-orange-500/30 bg-orange-500/10 shadow-[0_0_10px_rgba(251,146,60,0.2)]",
    ALERT: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_10px_rgba(250,204,21,0.2)]",
    ALLOW: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${variants[status] || variants.ALLOW}`}>
      {/* Small glowing dot next to the text */}
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
        status === "BLOCK" ? "bg-red-500" : 
        status === "FLAG" ? "bg-orange-500" : 
        status === "ALERT" ? "bg-yellow-500" : "bg-emerald-500"
      }`} />
      
      {status}
    </div>
  );
}