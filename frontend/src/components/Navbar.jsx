"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../lib/store";

export default function Navbar() {
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const pathname = usePathname();

  // BEFORE LOGIN LINKS
  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Technology", href: "#technology" },
    { name: "Enterprise", href: "#enterprise" },
  ];

  // AFTER LOGIN LINKS
  const consoleLinks = [
    { name: "Upload", href: "/console/upload" },
    { name: "Monitor", href: "/console/monitor" },
    { name: "Agent", href: "/console/agent" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#03060a]/50 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-8 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center">
            <span className="text-cyan-400 text-xs">🛡️</span>
          </div>
          <h1 className="text-white text-lg font-bold tracking-tight">DeepShield</h1>
        </Link>

        {/* CENTER LINKS (DYNAMIC SWITCH) */}
        <div className="flex gap-10 text-sm font-medium text-gray-400">
          
          {/* 🔓 BEFORE LOGIN */}
          {!isAuthenticated &&
            navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition">
                {link.name}
              </a>
            ))}

          {/* 🔐 AFTER LOGIN */}
          {isAuthenticated &&
            consoleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-bold ${
                  pathname === link.href
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-cyan-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex gap-4 items-center">
          
          {/* 🔓 BEFORE LOGIN */}
          {!isAuthenticated ? (
            <>
              <a href="#initialize" className="text-xs text-gray-500 font-bold hover:text-white">
                Login
              </a>
              <a
                href="#initialize"
                className="bg-emerald-500 text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/15"
              >
                Get Started
              </a>
            </>
          ) : (
            /* 🔐 AFTER LOGIN */
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Terminal Active</span>
              <div className="w-8 h-8 rounded-full bg-gray-800" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}