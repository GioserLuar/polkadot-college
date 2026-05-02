import { Nav } from "@/components/Nav";
import { HeroCurtain } from "@/components/HeroCurtain";
import { Purpose } from "@/components/Purpose";
import { MissionVision } from "@/components/MissionVision";
import { AcademicModel } from "@/components/AcademicModel";
import { Ecosystem } from "@/components/Ecosystem";
import { Pillars } from "@/components/Pillars";
import { GavinWood } from "@/components/GavinWood";
import { Trajectory } from "@/components/Trajectory";
import { Impact } from "@/components/Impact";
import { Uruguay } from "@/components/Uruguay";
import { Footer } from "@/components/Footer";

/**
 * Polkadot College — Landing Page
 * Cinematic one-page institutional site.
 * Full: Nav + Sections 1-10 + Footer
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Section 1 — Hero with curtain reveal */}
        <HeroCurtain />

        {/* Section 2 — Purpose: cursor-driven image reveal */}
        <Purpose />

        {/* Section 3 — Mission & Vision + Coverflow carousel */}
        <MissionVision />

        {/* Section 4 — Academic Model with stagger fade-in */}
        <AcademicModel />

        {/* Section 5 — Ecosystem: sticky card stack */}
        <Ecosystem />

        {/* Section 6 — Institutional Pillars: full-viewport word reveal */}
        <Pillars />

        {/* Section 7 — Dr. Gavin Wood: marquee + parallax + video + quote */}
        <GavinWood />

        {/* Section 8 — Trajectory: odometer + marquee + carousel */}
        <Trajectory />

        {/* Section 9 — Impact: spotlight border cards */}
        <Impact />

        {/* Section 10 — Uruguay: grayscale logo grid */}
        <Uruguay />
      </main>

      <Footer />
    </>
  );
}
