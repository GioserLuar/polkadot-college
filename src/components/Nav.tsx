"use client";

import { useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import Image from "next/image";

/** Navigation anchor links mapped to section IDs */
const NAV_LINKS = [
  { label: "Inicio", href: "#hero" },
  { label: "Propósito", href: "#proposito" },
  { label: "Misión", href: "#mision" },
  { label: "Académico", href: "#academico" },
] as const;

/**
 * Nav — Sticky navigation bar
 * Transparent over Hero, transitions to solid #1F294E after 80px scroll.
 * Polkadot icon left, anchor links center, CTA button right.
 * Mobile: hamburger with slide-down panel.
 */
export function Nav() {
  const { scrolled } = useScrollPosition(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1F294E]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo — Polkadot icon + brand name */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-3 group"
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

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#4C99D4] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick("#academico")}
            className="bg-white text-[#1F294E] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4C99D4] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#4C99D4]/25"
          >
            Explorar Programas
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menú"
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#1F294E]/95 backdrop-blur-md px-6 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white/80 hover:text-white text-base font-medium text-left py-2 border-b border-white/10"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#academico")}
            className="bg-white text-[#1F294E] px-6 py-3 rounded-full text-sm font-semibold mt-2"
          >
            Explorar Programas
          </button>
        </div>
      </div>
    </nav>
  );
}
