import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Journal } from "@/components/sections/Journal";
import { Contact } from "@/components/sections/Contact";

// The OUTIS operating system — one continuous, interactive surface.
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Timeline />
      <Journal />
      <Contact />
    </>
  );
}
