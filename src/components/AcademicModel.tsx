"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Four academic model pillars — in order from the brief */
const MODEL_LINES = [
  "Un modelo integrado para el aprendizaje y la innovación",
  "Modular e interdisciplinario",
  "Un enfoque ágil en permanente actualización",
  "De los fundamentos a la implementación en entornos reales",
];

/**
 * AcademicModel — Section 4
 * Full-bleed background with overlay + stagger fade-in text lines.
 * Each line appears sequentially as the section enters the viewport.
 */
export function AcademicModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".model-title", {
        y: -30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Stagger fade-in for each line
      gsap.from(".model-line", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Decorative line separators animate width
      gsap.from(".model-separator", {
        scaleX: 0,
        stagger: 0.25,
        duration: 0.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="academico"
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Background image — PBA Graduation */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/images/PBA_HK_Graduation extended.webp'), linear-gradient(135deg, #1a2040 0%, #0d1425 100%)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1F294E]/50" />

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2
            className="model-title text-display-lg text-white mb-16"
            style={{ visibility: "hidden" }}
          >
            Modelo Académico
          </h2>

          {/* Four lines with stagger */}
          <div ref={linesRef} className="space-y-8">
            {MODEL_LINES.map((line, i) => (
              <div key={i}>
                <p
                  className="model-line text-white font-semibold text-xl md:text-2xl lg:text-3xl leading-snug"
                  style={{ visibility: "hidden" }}
                >
                  <span className="text-[#4C99D4] mr-3 font-mono text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </p>
                {i < MODEL_LINES.length - 1 && (
                  <div className="model-separator w-16 h-px bg-[#4C99D4]/40 mx-auto mt-8 origin-left" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
