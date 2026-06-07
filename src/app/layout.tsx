import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Engineering & Systems",
  description:
    "Personal engineering portfolio — embedded systems, machine learning, and modern software.",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Portfolio | Engineering & Systems",
    description:
      "Personal engineering portfolio — embedded systems, machine learning, and modern software.",
    type: "website",
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
