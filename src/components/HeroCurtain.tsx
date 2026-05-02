"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * HeroCurtain — Section 1
 * Two #1F294E panels open like curtains on page load, revealing the hero.
 * Background: full-bleed render image with 50% overlay.
 * Post-reveal: subtitle fades + slides up.
 *
 * Reference: cinematic-site-components/curtain-reveal.html
 */
export function HeroCurtain() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      delay: 0.5,
    });

    // 1) Curtains open
    tl.to(leftPanelRef.current, {
      xPercent: -100,
      duration: 1.4,
    });
    tl.to(
      rightPanelRef.current,
      {
        xPercent: 100,
        duration: 1.4,
      },
      "<" // Simultaneous with left panel
    );

    // 2) Title fades in
    tl.from(
      titleRef.current,
      {
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3) Subtitle slides up
    tl.from(
      subtitleRef.current,
      {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* Background image — uses gradient placeholder until real image is available */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/images/Polkadot College_Uruguay Render_01.webp'), linear-gradient(135deg, #1a2040 0%, #0d1425 50%, #1a2040 100%)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1F294E]/50" />

      {/* Curtain panels — these cover everything and slide away */}
      <div
        ref={leftPanelRef}
        className="curtain-panel absolute inset-y-0 left-0 w-1/2 bg-[#1F294E] z-30 flex items-center justify-end pr-4"
      >
        <span className="text-display-xl text-white/10 select-none tracking-tighter">
          P
        </span>
      </div>
      <div
        ref={rightPanelRef}
        className="curtain-panel absolute inset-y-0 right-0 w-1/2 bg-[#1F294E] z-30 flex items-center justify-start pl-4"
      >
        <span className="text-display-xl text-white/10 select-none tracking-tighter">
          C
        </span>
      </div>

      {/* Content — visible once curtains part */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-display-xl text-white mb-8"
          style={{ visibility: "hidden" }}
        >
          Polkadot College
        </h1>
        <p
          ref={subtitleRef}
          className="text-body-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
          style={{ visibility: "hidden" }}
        >
          Una <strong className="text-white font-semibold">nueva Institución Académica</strong> dedicada
          a impulsar los sistemas descentralizados con{" "}
          <strong className="text-white font-semibold">
            solidez intelectual, relevancia práctica y proyección global
          </strong>
          .
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
