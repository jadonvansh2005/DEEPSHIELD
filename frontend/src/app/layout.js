"use client";

import "./globals.css";
import { useEffect } from "react";
import { useStore } from "../lib/store";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  const loadUser = useStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <html lang="en" className="scroll-smooth"> 
      <body className="antialiased bg-[#03060a] text-slate-200 min-h-screen selection:bg-cyan-500/30">
        {/* The Navbar now contains all navigation since Sidebar is deleted */}
        <Navbar />

        {/* Removed 'flex' and 'md:ml-64'. 
            Content is now full-width and centered for a professional landing page feel.
        */}
        <main className="relative min-h-[calc(100vh-76px)] transition-all duration-500">
          
          {/* Global atmospheric glow effect (defined in your globals.css) */}
          <div className="bg-atmos-glow" /> 

          {/* Wrapper to keep content from hitting the screen edges */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
            {children}
          </div>

        </main>

        {/* Optional: Footer can be added here later for Technology/Enterprise links */}
      </body>
    </html>
  );
}