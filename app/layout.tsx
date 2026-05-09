import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outis | Crypto Content Creator",
  description: "Crypto researcher and content creator focused on Privacy, DePIN, and AI infrastructure. Co-founder at KOSLabs.",
  keywords: ["Web3", "Crypto", "Privacy", "DePIN", "AI Infrastructure", "KOSLabs"],
  authors: [{ name: "Outis" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Outis | Crypto Content Creator",
    description: "Crypto research, real talk, and content that actually lands.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outis | Crypto Content Creator",
    description: "Crypto research, real talk, and content that actually lands.",
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