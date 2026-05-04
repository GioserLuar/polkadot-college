"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Image from "next/image";

/** Navigation anchor links mapped to section IDs */
const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Propósito", href: "#proposito" },
  { label: "Misión", href: "#mision" },
  { label: "Valores Institucionales", href: "#pilares" },
  { label: "Dr. Gavin Wood", href: "#gavin-wood" },
  { label: "Nuestra Trayectoria", href: "#trayectoria" },
  { label: "Modelo Académico", href: "#academico" },
  { label: "Impacto Nacional", href: "#impacto" },
] as const;

/**
 * Nav — Sticky navigation bar with hamburger menu on ALL viewports.
 * Transparent over Hero, transitions to solid #1F294E after 80px scroll.
 * Logo left, hamburger right. Fullscreen overlay menu on open.
 */
export function Nav() {
  const { scrolled } = useScrollPosition(80);
  const [menuOpen, setMenuOpen] = useState(false);

  /** Lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /** Close menu on Escape key */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    // Small delay to let overlay close animation start before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <>
      {/* Top bar — always visible */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-[#1F294E]/95 backdrop-blur-md shadow-lg"
            : menuOpen
              ? "bg-transparent"
              : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo — Polkadot icon + brand name */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 group z-[60]"
            aria-label="Ir al inicio"
          >
            <div className="w-8 h-8 relative flex items-center justify-center">
              <Image
                src="/assets/images/Polkadot_Icon_Black.png"
                alt="Polkadot College"
                width={32}
                height={32}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight hidden sm:block">
              Polkadot College
            </span>
          </button>

          {/* Hamburger button — visible on ALL viewports */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] p-2 group"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <div className="w-7 h-6 relative flex flex-col justify-center items-center gap-[6px]">
              {/* Top line */}
              <span
                className={`block h-[2px] rounded-full bg-white transition-all duration-400 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                  menuOpen
                    ? "w-7 rotate-45 translate-y-[8px]"
                    : "w-7 group-hover:w-5"
                }`}
              />
              {/* Middle line */}
              <span
                className={`block h-[2px] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                  menuOpen ? "w-0 opacity-0" : "w-5 group-hover:w-7"
                }`}
              />
              {/* Bottom line */}
              <span
                className={`block h-[2px] rounded-full bg-white transition-all duration-400 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                  menuOpen
                    ? "w-7 -rotate-45 -translate-y-[8px]"
                    : "w-7 group-hover:w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background overlay */}
        <div
          className={`absolute inset-0 bg-[#1F294E]/98 backdrop-blur-xl transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.18,1)] origin-top ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* Menu content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          {/* Nav links — staggered entrance */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-white/80 hover:text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-wide py-2 sm:py-3 transition-all duration-500 hover:tracking-widest ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms",
                }}
              >
                <span className="relative group">
                  <span className="text-[#4C99D4]/60 text-xs sm:text-sm font-mono mr-3 align-middle">
                    0{i + 1}
                  </span>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#4C99D4] group-hover:w-full transition-all duration-300" />
                </span>
              </button>
            ))}
          </div>

          {/* CTA button */}
          <div
            className={`mt-8 sm:mt-10 transition-all duration-500 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: menuOpen
                ? `${150 + NAV_LINKS.length * 60 + 80}ms`
                : "0ms",
            }}
          >
            <button
              onClick={() => handleNavClick("#academico")}
              className="bg-white text-[#1F294E] px-8 py-3 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-[#4C99D4] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#4C99D4]/25 hover:scale-105"
            >
              Explorar Programas
            </button>
          </div>

          {/* Decorative dot grid — subtle background pattern */}
          <div
            className={`absolute bottom-12 right-12 opacity-10 transition-opacity duration-700 ${
              menuOpen ? "opacity-10" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
