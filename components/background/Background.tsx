"use client";

import { Starfield } from "./Starfield";
import { useSystemMode } from "../system/SystemModeProvider";

// The depth stack behind the whole system:
//   base space colour → drifting nebula auroras → faint grid → starfield canvas
// Aurora blobs are CSS-animated (cheap, GPU-composited). SYSTEM mode lifts their
// opacity and animation; NORMAL keeps them quiet and readable.
export function Background() {
  const { isSystem } = useSystemMode();

  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden bg-[#0b1316]">
      {/* deep radial vignette so content stays legible toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(22,48,61,0.6), rgba(11,19,22,0) 60%)",
        }}
      />

      {/* drifting aurora nebula */}
      <div
        className="aurora aurora--cyan absolute rounded-full"
        style={{ opacity: isSystem ? 0.55 : 0.32 }}
      />
      <div
        className="aurora aurora--purple absolute rounded-full"
        style={{ opacity: isSystem ? 0.5 : 0.28 }}
      />
      <div
        className="aurora aurora--deep absolute rounded-full"
        style={{ opacity: isSystem ? 0.4 : 0.22 }}
      />

      {/* faint engineering grid */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isSystem ? 0.05 : 0.03,
          backgroundImage:
            "linear-gradient(rgba(108,155,173,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,155,173,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 80% at 50% 30%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 30%, #000 30%, transparent 80%)",
        }}
      />

      <Starfield />

      {/* subtle grain to kill banding on the gradients */}
      <div className="bg-grain absolute inset-0" style={{ opacity: 0.4 }} />
    </div>
  );
}
