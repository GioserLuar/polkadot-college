import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

/**
 * Inter — Primary display and body font
 * Loads weights 400-700 for versatile typography hierarchy
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Caveat — Handwritten accent font (used in section 5+)
 */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polkadot College — Educación Web3 en Uruguay",
  description:
    "Una nueva Institución Académica dedicada a impulsar los sistemas descentralizados con solidez intelectual, relevancia práctica y proyección global.",
  keywords: [
    "Polkadot",
    "Web3",
    "blockchain",
    "educación",
    "Uruguay",
    "descentralización",
    "academia",
  ],
  openGraph: {
    title: "Polkadot College — Educación Web3 en Uruguay",
    description:
      "Institución académica enfocada en sistemas descentralizados y Web3.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${caveat.variable}`}>
      <body className="font-[family-name:var(--font-inter)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
