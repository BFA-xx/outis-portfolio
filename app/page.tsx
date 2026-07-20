import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Timeline } from "@/components/sections/Timeline";
import { Builds } from "@/components/sections/Builds";
import { Journal } from "@/components/sections/Journal";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";

// The OUTIS operating system - one continuous, interactive surface.
export default function Home() {
  return (
    <>
      <Hero />
      <Stack />
      <Services />
      <Projects />
      <Timeline />
      <Builds />
      <Journal />
      <Clients />
      <Contact />
    </>
  );
}
