'use client';

import { useRef, useCallback } from 'react';

/** Impact card data */
const CARDS = [
  {
    num: '01',
    title: 'Promueve la prosperidad y el desarrollo económico',
  },
  {
    num: '02',
    title:
      'Impulsa el talento tecnológico y la infraestructura digital avanzada',
  },
  {
    num: '03',
    title:
      'Atrae inversión e innovación, generando empleo local en sectores clave',
  },
];

/**
 * Sección 9 — Impacto Nacional y Valor Estratégico
 * Spotlight border cards: a radial-gradient follows the cursor
 * across all cards to create a unified glow effect.
 */
export function Impact() {
  const gridRef = useRef<HTMLDivElement>(null);

  /** Update CSS custom properties on all cards to track cursor position */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cards = gridRef.current?.querySelectorAll('.impact-card');
      cards?.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty(
          '--mx',
          `${e.clientX - rect.left}px`
        );
        (card as HTMLElement).style.setProperty(
          '--my',
          `${e.clientY - rect.top}px`
        );
      });
    },
    []
  );

  return (
    <section
      id="impacto"
      className="section-padding"
      style={{ background: '#0a0a0b', color: '#eae7e2' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-md text-white mb-4">
            Impacto Nacional y Valor Estratégico
          </h2>
          <p className="text-body-lg text-white/60 max-w-2xl mx-auto">
            Donde la excelencia académica se traduce en impacto económico y
            social.
          </p>
        </div>

        {/* Spotlight grid */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] rounded-2xl overflow-hidden"
          style={{ background: '#1e1e22' }}
        >
          {CARDS.map((card) => (
            <div
              key={card.num}
              className="impact-card relative overflow-hidden cursor-default p-12"
              style={{ background: '#0a0a0b' }}
            >
              {/* Spotlight glow pseudo-element via inline styles */}
              <div
                className="absolute inset-[-1px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(circle 200px at var(--mx, 50%) var(--my, 50%), rgba(76, 153, 212, 0.12), transparent)',
                }}
              />
              <div className="relative z-10">
                <span
                  className="block text-4xl font-bold mb-4"
                  style={{ color: 'rgba(234, 231, 226, 0.08)' }}
                >
                  {card.num}
                </span>
                <h3 className="text-lg font-semibold leading-snug">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
