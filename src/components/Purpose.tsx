"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Purpose — Section 2
 * Split layout with two images superimposed.
 * Desktop: cursor-driven clip-path circle reveals the forest image.
 * Mobile: auto-alternating opacity transition every 3s.
 *
 * Reference: cinematic-site-components/cursor-reveal.html (circular spotlight)
 */
export function Purpose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showForest, setShowForest] = useState(false);

  /** Detect mobile viewport */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /** Mobile: auto-alternate every 3s */
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => setShowForest((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  /** Desktop: cursor-driven clip-path reveal */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !revealRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = 150;
      revealRef.current.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !revealRef.current) return;
    revealRef.current.style.clipPath = "circle(0px at 50% 50%)";
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile || !revealRef.current) return;
    // Initial small circle at center
    revealRef.current.style.clipPath = "circle(80px at 50% 50%)";
  }, [isMobile]);

  return (
    <section id="proposito" className="relative">
      <div
        ref={containerRef}
        className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden cursor-none md:cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Base image — Urban render */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isMobile && showForest ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage:
              "url('/assets/images/Polkadot College_Uruguay Render_02.webp'), linear-gradient(135deg, #1a2040, #2a3060)",
          }}
        />

        {/* Reveal image — Forest render (desktop: clip-path, mobile: opacity) */}
        <div
          ref={revealRef}
          className={`absolute inset-0 bg-cover bg-center img-reveal ${
            isMobile
              ? showForest
                ? "opacity-100"
                : "opacity-0"
              : ""
          }`}
          style={{
            backgroundImage:
              "url('/assets/images/Polkadot College_Uruguay Render_02_Forest.webp'), linear-gradient(135deg, #0d3320, #1a5535)",
            clipPath: isMobile ? undefined : "circle(0px at 50% 50%)",
            transition: isMobile ? "opacity 1s ease" : "clip-path 0.1s ease",
          }}
        />

        {/* Title overlay — centered with text-shadow for readability */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h2
            className="text-display-lg text-white text-center px-6"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(31,41,78,0.3)",
            }}
          >
            Hub de Educación Web3
          </h2>
        </div>

        {/* Desktop hint */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 text-sm pointer-events-none">
            Mueve el cursor para explorar
          </div>
        )}
      </div>
    </section>
  );
}
