'use client';

import Image from 'next/image';

/** Partner university logos — updated black versions */
const PARTNERS = [
  { src: 'ORT_black_logo.png', name: 'Universidad ORT' },
  { src: 'UCU_black_logo.png', name: 'Universidad Católica' },
  { src: 'CERES_black_logo.png', name: 'CERES' },
  { src: 'UM_black_logo.png', name: 'Universidad de Montevideo' },
];

/**
 * Sección 10 — Uruguay
 * Grid of partner logos, grayscale by default, color on hover.
 */
export function Uruguay() {
  return (
    <section
      id="uruguay"
      className="section-padding"
      style={{ background: '#ffffff' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-display-md text-[#1F294E] text-center mb-16">
          Uruguay como entorno estratégico para el Polkadot College
        </h2>

        {/* Logo grid — 4 cols desktop, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center justify-center p-6 rounded-xl border border-[#e5e5ea] hover:border-[#4C99D4] transition-colors duration-300"
            >
              <div className="relative w-full aspect-[3/2] filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image
                  src={`/assets/images/${partner.src}`}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
