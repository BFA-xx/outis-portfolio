"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type SystemMode = "normal" | "system";

interface SystemModeContextValue {
  mode: SystemMode;
  isSystem: boolean;
  toggle: () => void;
  setMode: (m: SystemMode) => void;
  /** Respect reduced-motion: when true, heavy effects should soften. */
  reduceMotion: boolean;
}

const SystemModeContext = createContext<SystemModeContextValue | null>(null);

export function SystemModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<SystemMode>("system");
  const [reduceMotion, setReduceMotion] = useState(false);

  // Hydrate persisted preference + reduced-motion once on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("outis-mode") as SystemMode | null;
      if (stored === "normal" || stored === "system") setModeState(stored);
    } catch {
      /* ignore */
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Reflect mode on <html> so CSS can react, and persist it.
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem("outis-mode", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const setMode = (m: SystemMode) => setModeState(m);
  const toggle = () => setModeState((m) => (m === "system" ? "normal" : "system"));

  return (
    <SystemModeContext.Provider
      value={{ mode, isSystem: mode === "system", toggle, setMode, reduceMotion }}
    >
      {children}
    </SystemModeContext.Provider>
  );
}

export function useSystemMode() {
  const ctx = useContext(SystemModeContext);
  if (!ctx) throw new Error("useSystemMode must be used within SystemModeProvider");
  return ctx;
}
