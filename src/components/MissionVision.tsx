"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Carousel images in exact order specified by the brief */
const CAROUSEL_IMAGES = [
  { src: "/assets/images/5Y3A2426.webp", alt: "PBA Campus evento 1" },
  { src: "/assets/images/5Y3A3760.webp", alt: "PBA Campus evento 2" },
  { src: "/assets/images/_DSC0728.webp", alt: "PBA Campus académico 1" },
  { src: "/assets/images/_DSC4127.webp", alt: "PBA Campus académico 2" },
  { src: "/assets/images/012_Z90_4570.webp", alt: "PBA Campus conferencia 1" },
  { src: "/assets/images/09_Z90_4269.webp", alt: "PBA Campus conferencia 2" },
];

/**
 * MissionVision — Section 3
 * Two columns: Mission (left) + Vision (right)
 * Below: 3D Coverflow carousel with autoplay 5s
 *
 * Reference: cinematic-site-components/coverflow.html
 */
export function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  // Embla carousel with autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /** Scroll-triggered entrance animation for mission/vision columns */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(missionRef.current, {
        x: -60,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
      gsap.from(visionRef.current, {
        x: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mision"
      className="bg-white section-padding"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#4C99D4] border border-[#4C99D4]/20 px-4 py-1.5 rounded-full mb-6">
            Nuestra Dirección
          </span>
        </div>

        {/* Two columns: Misión + Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          {/* Misión */}
          <div
            ref={missionRef}
            className="relative pl-6 border-l-2 border-[#4C99D4]"
            style={{ visibility: "hidden" }}
          >
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#4C99D4] mb-4 block">
              Misión
            </span>
            <p className="text-body text-[#1F294E]/80 leading-relaxed">
              Educar, investigar y construir para convertir los sistemas
              descentralizados en infraestructura global, fiable y utilizable.
            </p>
          </div>

          {/* Visión */}
          <div
            ref={visionRef}
            className="relative pl-6 border-l-2 border-[#1F294E]"
            style={{ visibility: "hidden" }}
          >
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#1F294E] mb-4 block">
              Visión
            </span>
            <p className="text-body text-[#1F294E]/80 leading-relaxed">
              Consolidarse como referente global en educación Web3, formando
              líderes capaces de desarrollar y escalar estas tecnologías con
              eficiencia, resiliencia y responsabilidad.
            </p>
          </div>
        </div>

        {/* ─── Coverflow Carousel ─── */}
        <div className="relative">
          {/* Embla viewport */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-4">
              {CAROUSEL_IMAGES.map((img, i) => (
                <div
                  key={img.src}
                  className="flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 relative"
                >
                  <div
                    className={`aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 ${
                      i === selectedIndex
                        ? "scale-100 shadow-2xl shadow-[#1F294E]/20"
                        : "scale-[0.88] opacity-60"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${img.src}'), linear-gradient(135deg, #1a2040 0%, #2a3060 100%)`,
                      }}
                      role="img"
                      aria-label={img.alt}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-[#1F294E]/20 flex items-center justify-center text-[#1F294E] hover:bg-[#1F294E] hover:text-white transition-all duration-300"
              aria-label="Imagen anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-[#1F294E]/20 flex items-center justify-center text-[#1F294E] hover:bg-[#1F294E] hover:text-white transition-all duration-300"
              aria-label="Siguiente imagen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "bg-[#1F294E] w-6"
                    : "bg-[#1F294E]/20"
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
