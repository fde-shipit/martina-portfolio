import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: 'Martina Edwards — Manager, AI Acceleration · Melbourne',
  description: 'AI delivery lead with a decade in enterprise infrastructure and regulated environments.',
  openGraph: {
    title: 'Martina Edwards — Manager, AI Acceleration · Melbourne',
    description: 'AI delivery lead with a decade in enterprise infrastructure and regulated environments.',
    url: 'https://martina-edwards.vercel.app',
    siteName: 'Martina Edwards',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martina Edwards — Manager, AI Acceleration · Melbourne',
    description: 'AI delivery lead with a decade in enterprise infrastructure and regulated environments.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <div id="progress-bar" />
        <Nav />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
