import type { Metadata } from "next";
import { TechnocoreGuide } from "@/components/sections/TechnocoreGuide";

export const metadata: Metadata = {
  title: "Technocore Without a Laptop // OUTIS",
  description:
    "A beginner field guide to creating your own Technocore DID and publishing a signed message using only a phone. Covers GitHub Codespaces and Termux, and where your private key is born on each route.",
  alternates: { canonical: "/technocore" },
  openGraph: {
    title: "Technocore Without a Laptop",
    description:
      "Create your own Technocore DID and publish a signed message using nothing but a phone.",
    type: "article",
    url: "https://www.realoutis.com/technocore",
  },
};

export default function TechnocorePage() {
  return <TechnocoreGuide />;
}
