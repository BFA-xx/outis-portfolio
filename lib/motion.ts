// Shared motion language. Spring physics over linear easing, subtle but always
// present. Tuned so SYSTEM mode can amplify without rewriting variants.
import type { Transition, Variants } from "framer-motion";

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 1,
};

export const snappySpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...softSpring },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { ...spring } },
};

// Smooth, expensive-feeling ease used for overlays.
export const cinematic: [number, number, number, number] = [0.16, 1, 0.3, 1];
