'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Ecosystem card data — the 4 pillars of the ecosystem */
const CARDS = [
  {
    title: 'Plan de Estudios Especializado',
    text: 'Programas orientados a la formación práctica en negocios digitales y tecnologías emergentes.',
    bg: '#1F294E',
    color: '#ffffff',
  },
  {
    title: 'Hub de Incubación',
    text: 'Espacios de acompañamiento para etapas iniciales de proyectos y la validación de iniciativas.',
    bg: '#2a3a6a',
    color: '#e8ecf0',
  },
  {
    title: 'Parque Científico',
    text: 'Un entorno diseñado para la consolidación y escalamiento de emprendimientos dentro de una comunidad tecnológica.',
    bg: '#4C99D4',
    color: '#ffffff',
  },
  {
    title: 'Campus de Innovación',
    text: 'Infraestructura residencial y de servicios que favorece la interacción continua entre estudiantes, investigadores, emprendedores e inversores.',
    bg: '#0d1b3e',
    color: '#e8ecf0',
  },
];

/**
 * Sección 5 — Ecosistema
 * Sticky card stack: each card pins at increasing `top` offsets,
 * older cards scale down and dim as new ones cover them.
 */
export function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.eco-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.5,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosistema"
      className="section-padding"
      style={{ background: '#f8f9fc' }}
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-display-md text-[#1F294E] mb-4">
          Nuestro Ecosistema: Aprender, Emprender y Liderar
        </h2>
        <p
          className="text-2xl text-[#4C99D4]"
          style={{ fontFamily: 'var(--font-handwritten)' }}
        >
          Más allá del formato tradicional de aula
        </p>
      </div>

      {/* Sticky card stack */}
      <div className="max-w-2xl mx-auto pb-12">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            className="eco-card sticky rounded-3xl p-10 md:p-12 mb-8 min-h-[280px] flex flex-col justify-end shadow-xl"
            style={{
              top: `${80 + i * 24}px`,
              background: card.bg,
              color: card.color,
              zIndex: i + 1,
              willChange: 'transform',
            }}
          >
            <span className="text-xs tracking-widest uppercase opacity-50 mb-3">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-heading mb-3">{card.title}</h3>
            <p className="text-body opacity-80 max-w-[50ch]">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
