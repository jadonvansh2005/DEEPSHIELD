export default function Card({ children, title, subtitle, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0d121c]/40 backdrop-blur-xl 
      border border-white/[0.08] rounded-2xl p-6 
      transition-all duration-300 hover:border-cyan-500/30 
      group ${className}`}
    >
      {/* Optional subtle inner glow to match the screenshot vibe */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent pointer-events-none" />

      {title && (
        <div className="mb-4 relative z-10">
          <h3 className="text-white font-semibold tracking-tight">{title}</h3>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}