import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Surya SGF | Next-Gen Specialty Films — BOPP, BOPET & BOPE",
  description:
    "India's emerging multi-polymer film platform. Surya SGF manufactures world-class BOPP, BOPET and BOPE specialty films for flexible packaging — built to scale, built to lead.",
  keywords: [
    "BOPP films", "BOPET films", "BOPE films", "specialty films India",
    "flexible packaging films", "Surya SGF", "biaxially oriented films",
    "sustainable packaging", "film manufacturer India",
  ],
  openGraph: {
    title: "Surya SGF | Next-Gen Specialty Films",
    description: "World-class BOPP, BOPET & BOPE films. Built to Scale. Built to Lead.",
    type: "website",
    url: "https://suryasgf.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <div className="scanline" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
