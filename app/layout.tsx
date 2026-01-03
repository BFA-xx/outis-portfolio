import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outis | Web3 Researcher & Builder",
  description: "Crypto researcher and builder focused on Privacy, DePIN, AI infrastructure, and vibe coding. Co-founder at KOSLabs.",
  keywords: ["Web3", "Crypto", "Privacy", "DePIN", "AI Infrastructure", "Blockchain", "KOSLabs"],
  authors: [{ name: "Outis" }],
  openGraph: {
    title: "Outis | Web3 Researcher & Builder",
    description: "Bridging crypto research with real-world systems thinking",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outis | Web3 Researcher & Builder",
    description: "Bridging crypto research with real-world systems thinking",
    creator: "@Tosincrypt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}