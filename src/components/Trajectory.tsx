'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/** Counter data */
const COUNTERS = [
  { value: 1200, prefix: '+', label: 'Alumni' },
  { value: 7, prefix: '', label: 'Ediciones presenciales' },
  { value: 75, prefix: '+', label: 'Nacionalidades' },
];

/** University logos for the marquee — using updated black versions */
const UNI_LOGOS = [
  { src: '/assets/images/Cambridge_black_logo.png', alt: 'Cambridge' },
  { src: '/assets/images/Berkley_black_logo.png', alt: 'Berkeley' },
  { src: '/assets/images/UBA_black_logo.png', alt: 'Buenos Aires' },
  { src: '/assets/images/HSLU_black_logo.png', alt: 'HSLU Lucerne' },
  { src: '/assets/images/NUS_black_logo.png', alt: 'NUS Singapore' },
  { src: '/assets/images/HK_black_logo.png', alt: 'Hong Kong' },
  { src: '/assets/images/BALI_black_logo.png', alt: 'Bali' },
];

/** Carousel images */
const CAROUSEL_IMAGES = [
  { src: 'PBA_UBA_Gavin Wood lecture_01.webp', alt: 'Gavin Wood lecture UBA 01' },
  { src: 'PBA_Students in class.webp', alt: 'PBA estudiantes en clase' },
  { src: 'Teacher_Kian Paimani.webp', alt: 'Profesor Kian Paimani' },
  { src: 'PBA_UBA_Gavin Wood lecture_02.webp', alt: 'Gavin Wood lecture UBA 02' },
];

/**
 * Sección 8 — Nuestra Trayectoria
 * Odometer counters + video + kinetic marquee logos + Embla carousel.
 */
export function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Embla carousel with autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Odometer trigger — animate digit strips
      if (countersRef.current) {
        ScrollTrigger.create({
          trigger: countersRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            countersRef.current
              ?.querySelectorAll('.odo-strip')
              .forEach((strip) => {
                const el = strip as HTMLElement;
                const target = parseInt(el.dataset.digit || '0');
                const h =
                  (el.children[0] as HTMLElement)?.offsetHeight || 0;
                el.style.transform = `translateY(-${target * h}px)`;
              });
          },
        });
      }

      // Marquee infinite scroll animation
      const marquee = marqueeRef.current;
      if (marquee) {
        const content = marquee.querySelector(
          '.traj-marquee-content'
        ) as HTMLElement;
        if (content) {
          const clone = content.cloneNode(true) as HTMLElement;
          marquee.appendChild(clone);
          const totalWidth = content.offsetWidth;
          gsap.to(marquee, {
            x: -totalWidth,
            ease: 'none',
            duration: 25,
            repeat: -1,
          });
        }
      }

      // Fade-in elements
      gsap.utils.toArray<HTMLElement>('.traj-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trayectoria"
      className="section-padding"
      style={{ background: '#0a0a0b', color: '#eae7e2' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="traj-fade text-center mb-16">
          <h2 className="text-display-md text-white mb-4">
            Nuestra Trayectoria
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-body-lg text-white/70 font-bold">De</span>
            <span className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-2">
              <img
                src="/assets/images/PBA_Logo_white.png"
                alt="Polkadot Blockchain Academy"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </span>
            <span className="text-body-lg text-white/70 font-bold">a</span>
            <span className="inline-flex items-center gap-2 bg-[#4C99D4]/20 border border-[#4C99D4]/40 rounded-full px-4 py-1.5">
              <img
                src="/assets/images/Polkadot_Icon_Black.png"
                alt="Polkadot College"
                className="w-5 h-5 brightness-0 invert"
              />
              <span className="text-[#4C99D4] font-bold text-sm tracking-tight">Polkadot College</span>
            </span>
          </div>
        </div>

        {/* Odometer counters */}
        <div
          ref={countersRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {COUNTERS.map((counter) => {
            const digits = String(counter.value).split('');
            return (
              <div
                key={counter.label}
                className="text-center p-10 bg-[#111114] border border-[#1e1e22] rounded-2xl"
              >
                <div
                  className="font-mono font-bold text-[#4C99D4] overflow-hidden flex justify-center items-center"
                  style={{
                    fontSize: 'clamp(36px, 6vw, 64px)',
                    letterSpacing: '-0.03em',
                    height: '1.15em',
                  }}
                >
                  {counter.prefix && (
                    <span>{counter.prefix}</span>
                  )}
                  {digits.map((d, i) => (
                    <span
                      key={`${counter.label}-${i}`}
                      className="inline-block overflow-hidden relative"
                      style={{ height: '1.15em' }}
                    >
                      <span
                        className="odo-strip flex flex-col transition-transform duration-[1500ms]"
                        data-digit={d}
                        style={{
                          transitionTimingFunction:
                            'cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${i * 0.12}s`,
                        }}
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <span
                            key={n}
                            className="block"
                            style={{
                              height: '1.15em',
                              lineHeight: '1.15',
                            }}
                          >
                            {n}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="text-sm text-[#5a5a5e] mt-3">
                  {counter.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Video — autoplay muted loop */}
        <div className="traj-fade mb-16">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full rounded-2xl aspect-video bg-[#111114]"
          >
            <source
              src="/assets/images/PBA CAMPUS RECAP.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Kinetic marquee — university logos */}
        <div className="overflow-hidden py-8 mb-16 border-y border-[#1e1e22]">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            <div className="traj-marquee-content flex items-center gap-16 px-8">
              {UNI_LOGOS.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex-shrink-0 w-28 h-10 relative opacity-70"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="112px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel — autoplay 5s */}
        <div
          className="traj-fade overflow-hidden rounded-2xl"
          ref={emblaRef}
        >
          <div className="flex">
            {CAROUSEL_IMAGES.map((img) => (
              <div
                key={img.src}
                className="flex-[0_0_100%] min-w-0 aspect-video relative bg-gradient-to-br from-[#1F294E] to-[#4C99D4]"
              >
                <Image
                  src={`/assets/images/${img.src}`}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
