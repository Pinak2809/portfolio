import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://pinakbuild.work";

const title = "Pinak Ganatra — Embedded Systems & AI Engineer";
const description =
  "Engineering portfolio — embedded systems, industrial AI/ML, PLC-SCADA commissioning, and full-stack software.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Pinak Ganatra",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-text font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
