import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SystemModeProvider } from "@/components/system/SystemModeProvider";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Background } from "@/components/background/Background";
import { FloatingDock } from "@/components/ui/FloatingDock";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.realoutis.com"),
  title: "OUTIS // System Core",
  description:
    "OUTIS — Systems & automation engineer and Web3 builder. A live interactive operating system showcasing Mintooor (mainnet NFT mint engine) and the KOS whitelist raffle infrastructure.",
  keywords: [
    "OUTIS",
    "Web3",
    "automation",
    "systems engineering",
    "NFT mint bot",
    "Mintooor",
    "Discord bot",
    "KOSLabs",
  ],
  authors: [{ name: "OUTIS" }],
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "OUTIS // System Core",
    description:
      "A live interactive operating system. Builder across Web3, automation and systems engineering.",
    type: "website",
    url: "https://www.realoutis.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "OUTIS // System Core",
    description: "Builder across Web3, automation and systems engineering.",
    creator: "@Tosincrypt",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        <SystemModeProvider>
          <Background />
          <SmoothScroll />
          <FloatingDock />
          <main className="relative z-10">{children}</main>
        </SystemModeProvider>
      </body>
    </html>
  );
}
