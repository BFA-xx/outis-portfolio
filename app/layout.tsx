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
    "OUTIS builds the software crypto projects launch with: launch sites, token pages, dashboards, admin panels, claim and staking portals, Telegram and Discord bots and wallet integrations. Available for freelance Web3 development.",
  keywords: [
    "OUTIS",
    "Web3 developer",
    "freelance Web3 developer",
    "crypto website developer",
    "token landing page",
    "NFT mint bot",
    "Telegram bot developer",
    "Discord bot developer",
    "Web3 dashboard",
    "Mintooor",
    "KOSLabs",
  ],
  authors: [{ name: "OUTIS" }],
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: {
    title: "OUTIS // System Core",
    description:
      "Web3 developer building launch sites, token pages, dashboards, claim and staking portals, Telegram and Discord bots. Available for freelance work.",
    type: "website",
    url: "https://www.realoutis.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "OUTIS // System Core",
    description:
      "Web3 developer building launch sites, dashboards, portals and bots. Available for freelance work.",
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
