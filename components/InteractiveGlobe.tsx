"use client";

import React from "react";
import { motion } from "framer-motion";

const InteractiveGlobe = () => {
  return (
    <div className="relative w-80 h-80 md:w-[460px] md:h-[460px] flex items-center justify-center select-none">

      {/* ── Ambient outer glow ── */}
      <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-3xl scale-110 animate-pulse pointer-events-none" />
      <div className="absolute inset-8 rounded-full bg-indigo-600/10 blur-2xl scale-110 pointer-events-none" />

      {/* ═══════════════════════════════════════════
          THREE ORBITAL RINGS (gyroscope / armillary)
          Each ring is an absolutely-positioned div
          with a border-based ellipse, rotated into
          a different 3-D plane via CSS perspective.
      ═══════════════════════════════════════════ */}

      {/* Ring 1 — equatorial (flat, fast) */}
      <div className="absolute inset-0 flex items-center justify-center"
           style={{ perspective: "600px" }}>
        <div className="absolute"
             style={{
               width: "110%",
               height: "110%",
               border: "1.5px solid rgba(99,179,237,0.45)",
               borderRadius: "50%",
               boxShadow: "0 0 12px rgba(99,179,237,0.2), inset 0 0 8px rgba(99,179,237,0.1)",
               animation: "orbitEquatorial 8s linear infinite",
             }}>
          {/* Moving glowing dot on Ring 1 */}
          <div style={{
            position: "absolute", top: "-5px", left: "calc(50% - 5px)",
            width: 10, height: 10, borderRadius: "50%",
            background: "#60a5fa",
            boxShadow: "0 0 8px 4px rgba(96,165,250,0.6)",
          }} />
        </div>
      </div>

      {/* Ring 2 — tilted ~65° on X axis (medium speed) */}
      <div className="absolute inset-0 flex items-center justify-center"
           style={{ perspective: "600px" }}>
        <div className="absolute"
             style={{
               width: "118%",
               height: "118%",
               border: "1.5px solid rgba(139,92,246,0.40)",
               borderRadius: "50%",
               boxShadow: "0 0 14px rgba(139,92,246,0.18), inset 0 0 8px rgba(139,92,246,0.08)",
               animation: "orbitTilted 12s linear infinite",
             }}>
          {/* Moving glowing dot on Ring 2 */}
          <div style={{
            position: "absolute", top: "-5px", left: "calc(50% - 5px)",
            width: 9, height: 9, borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 8px 4px rgba(167,139,250,0.55)",
          }} />
        </div>
      </div>

      {/* Ring 3 — tilted ~30° on X + 90° on Y (slow, reverse) */}
      <div className="absolute inset-0 flex items-center justify-center"
           style={{ perspective: "600px" }}>
        <div className="absolute"
             style={{
               width: "126%",
               height: "126%",
               border: "1.5px solid rgba(52,211,153,0.35)",
               borderRadius: "50%",
               boxShadow: "0 0 14px rgba(52,211,153,0.15), inset 0 0 8px rgba(52,211,153,0.07)",
               animation: "orbitDiagonal 18s linear infinite reverse",
             }}>
          {/* Moving glowing dot on Ring 3 */}
          <div style={{
            position: "absolute", top: "-4px", left: "calc(50% - 4px)",
            width: 8, height: 8, borderRadius: "50%",
            background: "#34d399",
            boxShadow: "0 0 7px 3px rgba(52,211,153,0.5)",
          }} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          GLOBE SPHERE
      ═══════════════════════════════════════════ */}
      <div
        className="relative rounded-full overflow-hidden z-10"
        style={{
          width: "58%",
          height: "58%",
          background: "radial-gradient(circle at 35% 35%, #1e3a5f 0%, #0a1628 55%, #060b18 100%)",
          border: "1px solid rgba(96,165,250,0.25)",
          boxShadow: [
            "0 0 0 1px rgba(96,165,250,0.08)",
            "0 0 40px rgba(59,130,246,0.18)",
            "inset 0 0 50px rgba(0,0,0,0.7)",
            "inset -16px -16px 40px rgba(0,0,0,0.7)",
            "inset 12px 12px 30px rgba(59,130,246,0.18)",
          ].join(", "),
        }}
      >
        {/* Specular highlight */}
        <div style={{
          position: "absolute", top: "8%", left: "12%",
          width: "40%", height: "30%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "rotate(-20deg)",
        }} />

        {/* Scrolling longitude / latitude grid */}
        <div style={{
          position: "absolute", inset: 0,
          width: "300%", height: "100%",
          opacity: 0.35,
          animation: "scrollGrid 28s linear infinite",
        }}>
          <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            {[0, 400, 800].map(ox => (
              <g key={ox} transform={`translate(${ox},0)`} stroke="#60a5fa" strokeWidth="0.8">
                {/* Latitudes */}
                {[60, 110, 160, 200, 240, 290, 340].map(y => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y}
                        strokeDasharray={y === 200 ? "0" : "3 4"}
                        strokeWidth={y === 200 ? "1.2" : "0.7"} />
                ))}
                {/* Longitudes (ellipses) */}
                {[30, 70, 120, 170, 200, 230, 280, 330, 370].map((rx, i) => (
                  <ellipse key={i} cx="200" cy="200"
                    rx={rx} ry={rx > 180 ? 140 : 185}
                    fill="none"
                    strokeDasharray={rx > 160 ? "4 5" : "0"}
                    strokeWidth="0.7" />
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* City pulse nodes */}
        {/* Lagos */}
        <div style={{ position:"absolute", top:"62%", left:"46%", zIndex:30 }}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" style={{ boxShadow:"0 0 6px #3b82f6" }} />
          </span>
        </div>
        {/* New York */}
        <div style={{ position:"absolute", top:"36%", left:"24%", zIndex:30 }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" style={{ boxShadow:"0 0 6px #6366f1" }} />
          </span>
        </div>
        {/* London */}
        <div style={{ position:"absolute", top:"30%", left:"49%", zIndex:30 }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
        </div>
        {/* Singapore */}
        <div style={{ position:"absolute", top:"58%", left:"74%", zIndex:30 }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" style={{ boxShadow:"0 0 6px #8b5cf6" }} />
          </span>
        </div>
        {/* Dubai */}
        <div style={{ position:"absolute", top:"42%", left:"59%", zIndex:30 }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>

        {/* Connection arcs */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:20 }}
             viewBox="0 0 240 240" fill="none">
          <defs>
            <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arc2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arc3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M58 86 Q 100 40 111 149" stroke="url(#arc1)" strokeWidth="1.2"
                strokeDasharray="5 4" style={{ animation:"dashAnim 4s linear infinite" }} />
          <path d="M111 149 Q 162 110 178 100" stroke="url(#arc2)" strokeWidth="1.2"
                strokeDasharray="5 4" style={{ animation:"dashAnim 6s linear infinite" }} />
          <path d="M58 86 Q 80 120 142 101" stroke="url(#arc3)" strokeWidth="1"
                strokeDasharray="4 5" style={{ animation:"dashAnim 8s linear infinite reverse" }} />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════
          FLOATING STAT BADGES
      ═══════════════════════════════════════════ */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-2 right-0 md:bottom-6 md:right-4 bg-card/90 backdrop-blur-md border border-border px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-40"
      >
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Coverage</span>
          <span className="text-sm font-black text-foreground">150+ Countries</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute top-2 left-0 md:top-6 md:left-4 bg-card/90 backdrop-blur-md border border-border px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-40"
      >
        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Secured</span>
          <span className="text-sm font-black text-foreground">$2M+ Escrow</span>
        </div>
      </motion.div>

      {/* ── Global CSS keyframes ── */}
      <style>{`
        @keyframes orbitEquatorial {
          0%   { transform: rotateX(75deg) rotateZ(0deg); }
          100% { transform: rotateX(75deg) rotateZ(360deg); }
        }
        @keyframes orbitTilted {
          0%   { transform: rotateX(40deg) rotateY(20deg) rotateZ(0deg); }
          100% { transform: rotateX(40deg) rotateY(20deg) rotateZ(360deg); }
        }
        @keyframes orbitDiagonal {
          0%   { transform: rotateX(15deg) rotateY(70deg) rotateZ(0deg); }
          100% { transform: rotateX(15deg) rotateY(70deg) rotateZ(360deg); }
        }
        @keyframes scrollGrid {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes dashAnim {
          to { stroke-dashoffset: -24; }
        }
      `}</style>
    </div>
  );
};

export default InteractiveGlobe;
