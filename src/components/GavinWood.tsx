'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/** Logo data for the kinetic marquee strip */
const LOGOS = [
  { src: '/assets/images/Ethereum_logo.png', alt: 'Ethereum' },
  { src: '/assets/images/Polkadot_logo.png', alt: 'Polkadot' },
  { src: '/assets/images/Parity_logo.png', alt: 'Parity Technologies' },
];

/**
 * Sección 7 — Dr. Gavin Wood
 * Combines: title + text, kinetic marquee logos, parallax image grid,
 * embedded video, and split testimonial quote.
 */
export function GavinWood() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the two images
      gsap.utils.toArray<HTMLElement>('.gw-parallax').forEach((img, i) => {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -15 : -25,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Fade-in entrance for text blocks
      gsap.utils.toArray<HTMLElement>('.gw-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

      // Marquee infinite scroll
      const marquee = marqueeRef.current;
      if (marquee) {
        const content = marquee.querySelector('.marquee-content') as HTMLElement;
        if (content) {
          // Clone for seamless loop
          const clone = content.cloneNode(true) as HTMLElement;
          marquee.appendChild(clone);

          const totalWidth = content.offsetWidth;
          gsap.to(marquee, {
            x: -totalWidth,
            ease: 'none',
            duration: 20,
            repeat: -1,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gavin-wood"
      className="section-padding"
      style={{ background: '#ffffff' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="gw-fade text-center mb-16">
          <h2 className="text-display-md text-[#1F294E] mb-6">
            Dr. Gavin Wood, Visionario y Fundador
          </h2>
          <p className="text-body-lg text-[#1F294E]/70 max-w-3xl mx-auto">
            Uno de los principales arquitectos de los sistemas descentralizados
            modernos y una figura central en el desarrollo de la tecnología
            blockchain.
          </p>
          <p className="text-body-lg text-[#1F294E] font-bold mt-4 max-w-3xl mx-auto">
            Cocreador de Ethereum, creador del concepto Web3, fundador de
            Polkadot y Parity Technologies.
          </p>
        </div>

        {/* Marquee logos */}
        <div className="overflow-hidden py-10 border-y border-[#e5e5ea]">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            <div className="marquee-content flex items-center gap-20 px-10">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="flex-shrink-0 w-32 h-12 relative opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parallax image grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-[#1F294E] to-[#4C99D4] relative">
            <div className="gw-parallax w-full h-[120%] absolute top-0 left-0">
              <Image
                src="/assets/images/Gavin Wood_JAM launch.webp"
                alt="Dr. Gavin Wood — JAM Launch"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-[#4C99D4] to-[#1F294E] relative">
            <div className="gw-parallax w-full h-[120%] absolute top-0 left-0">
              <Image
                src="/assets/images/Gavin Wood_Bali lecture.webp"
                alt="Dr. Gavin Wood — Bali Lecture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Video embed */}
        <div className="gw-fade mt-16">
          <video
            controls
            preload="metadata"
            className="w-full rounded-2xl shadow-lg aspect-video bg-[#0a0a0b]"
            poster="/assets/images/gavin-video-poster.jpg"
          >
            <source
              src="/assets/images/Gavin Wood_Presentación español.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta el elemento video.
          </video>
        </div>

        {/* Split testimonial */}
        <div className="gw-fade grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 items-center">
          <blockquote className="text-[#1F294E]">
            <p
              className="text-display-md italic leading-snug"
              style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}
            >
              «Mi propósito es crear soluciones tecnológicas que mejoren tanto mi
              vida como la de los demás. Y lo hago porque creo que el mundo de
              hoy necesita una nueva manera de pensar el diseño tecnológico.»
            </p>
            <footer className="mt-6 text-sm text-[#1F294E]/60 tracking-wide uppercase">
              Dr. Gavin Wood
            </footer>
          </blockquote>

          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-[#1F294E] to-[#2a3a6a] relative overflow-hidden">
            <Image
              src="/assets/images/Dr. Gavin Wood portrait.webp"
              alt="Retrato del Dr. Gavin Wood"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
