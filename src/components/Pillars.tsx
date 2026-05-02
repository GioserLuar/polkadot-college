'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** The 10 institutional pillars */
const PILLARS = [
  'Excelencia académica',
  'Interoperabilidad',
  'Descentralización',
  'Resiliencia',
  'Soberanía del usuario',
  'Seguridad',
  'Responsabilidad individual',
  'Transparencia',
  'Innovación colaborativa',
  'Inclusión global',
];

/**
 * Sección 6 — Pilares Institucionales
 * Each pillar word occupies 100vh, appears centered with a scale+blur entrance,
 * then fades as the next one enters. The section height is 100vh × words.
 */
export function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.pillar-word');

      words.forEach((word) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: word,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Entry: scale up from 0.6, remove blur, fade in
        tl.fromTo(
          word,
          { scale: 0.6, opacity: 0, filter: 'blur(20px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.4 }
        );

        // Hold visible
        tl.to(word, { scale: 1, opacity: 1, duration: 0.2 });

        // Exit: scale up further, blur out
        tl.to(word, {
          scale: 1.3,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.4,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pilares"
      style={{ background: '#0a0a0b' }}
    >
      {/* Section header */}
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-display-md text-white text-center px-6">
          Pilares Institucionales
        </h2>
      </div>

      {/* Each pillar word = 100vh */}
      {PILLARS.map((word) => (
        <div
          key={word}
          className="h-screen flex items-center justify-center sticky top-0"
        >
          <span
            className="pillar-word text-center px-6 will-change-transform"
            style={{
              fontSize: 'clamp(36px, 8vw, 100px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            {word}
          </span>
        </div>
      ))}
    </section>
  );
}
