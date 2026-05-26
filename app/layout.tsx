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
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iMpatient™ — behavioral intelligence",
  description:
    "Your body has been keeping a notebook, quietly, for years. iMpatient is the first tool that gets to read it back.",
  openGraph: {
    title: "iMpatient™",
    description: "We're here to give you a little of your time back.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iMpatient™",
    description: "We're here to give you a little of your time back.",
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
