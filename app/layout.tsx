import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "iMpatient™ — behavioral intelligence",
  description:
    "iMpatient™ is a behavioral intelligence engine. It indexes the patterns of a life and returns them as warning, knowledge, context and growth.",
  openGraph: {
    title: "iMpatient™",
    description: "A behavioral intelligence engine that indexes the patterns of a life.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iMpatient™",
    description: "A behavioral intelligence engine that indexes the patterns of a life.",
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
      className={`${manrope.variable} ${newsreader.variable} ${GeistMono.variable}`}
    >
      <body className="font-ui antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
