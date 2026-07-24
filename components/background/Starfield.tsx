"use client";

import { useEffect, useRef } from "react";
import { useSystemMode } from "../system/SystemModeProvider";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1 - parallax + size + brightness
  r: number;
  tw: number;
  tws: number;
  vx: number;
  vy: number;
}

interface Node {
  bx: number; // base position (pre-parallax)
  by: number;
  vx: number;
  vy: number;
  r: number;
  rx: number; // resolved render position (filled each frame)
  ry: number;
}

// One lightweight canvas, two layers:
//   1) a faint parallax star backdrop (depth/atmosphere)
//   2) a constellation of tiny white dots that connect with lines - the links
//      brighten with scroll velocity and the field drifts up as you scroll down,
//      so it visibly "wires itself together" on the way down the page.
// Nearby dots also reach toward the cursor. Pauses when the tab is hidden.
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isSystem, reduceMotion } = useSystemMode();
  const flags = useRef({ isSystem, reduceMotion });
  flags.current = { isSystem, reduceMotion };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let nodes: Node[] = [];

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999 };
    let scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let prevScrollY = scrollY;
    let scrollVel = 0;

    let running = true;
    let raf = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sys = flags.current.isSystem;

      // faint depth backdrop
      const starBase = Math.min(Math.round((width * height) / 14000), 130);
      const starCount = sys ? starBase : Math.round(starBase * 0.72);
      stars = new Array(starCount).fill(0).map(() => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: 0.3 + z * 1.1,
          tw: Math.random() * Math.PI * 2,
          tws: 0.4 + Math.random() * 1.1,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        };
      });

      // constellation nodes. Denser divisor + a higher mobile floor so phones
      // still show a real network, not three lonely dots.
      const nodeBase = Math.min(Math.round((width * height) / 7000), 170);
      const nodeCount = sys ? nodeBase : Math.round(nodeBase * 0.9);
      nodes = new Array(nodeCount).fill(0).map(() => ({
        bx: Math.random() * width,
        by: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 2 + Math.random() * 2,
        rx: 0,
        ry: 0,
      }));
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / width - 0.5) * 2;
      pointer.ty = (e.clientY / height - 0.5) * 2;
      pointer.px = e.clientX;
      pointer.py = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.px = -9999;
      pointer.py = -9999;
    };

    const wrap = (v: number, max: number) => ((v % max) + max) % max;

    let last = performance.now();
    const render = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.6667, 3);
      last = now;
      const { isSystem: sys, reduceMotion: rm } = flags.current;

      // pointer inertia
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const parallax = rm ? 0 : sys ? 24 : 12;
      const drift = rm ? 0 : sys ? 1 : 0.6;

      // scroll velocity (smoothed, decaying) → drives link brightness
      const sy = window.scrollY;
      const sd = sy - prevScrollY;
      prevScrollY = sy;
      scrollVel = scrollVel * 0.88 + Math.abs(sd) * 0.12;
      scrollY = sy;
      const scrollBoost = rm ? 0 : Math.min(scrollVel * 0.02, 0.55);
      const scrollPar = rm ? 0 : sys ? 0.16 : 0.09; // field drifts up as you scroll

      ctx.clearRect(0, 0, width, height);

      // ── depth backdrop ──────────────────────────────────────────────────
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx * drift * dt;
        s.y += s.vy * drift * dt;
        if (s.x < -4) s.x = width + 4;
        else if (s.x > width + 4) s.x = -4;
        if (s.y < -4) s.y = height + 4;
        else if (s.y > height + 4) s.y = -4;

        const px = s.x - pointer.x * parallax * s.z;
        const py = s.y - pointer.y * parallax * s.z;
        s.tw += s.tws * 0.02 * dt;
        const tw = rm ? 0.8 : 0.5 + Math.sin(s.tw) * 0.5;
        const alpha = (0.18 + s.z * 0.4) * tw;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 234, 236, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // ── constellation: resolve positions ────────────────────────────────
      const maxDist = sys ? 172 : 152;
      const maxDist2 = maxDist * maxDist;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.bx += n.vx * drift * dt;
        n.by += n.vy * drift * dt;
        n.bx = wrap(n.bx, width);
        n.by = wrap(n.by, height);
        // pointer parallax + scroll parallax (wrapped vertically)
        n.rx = n.bx - pointer.x * parallax * 0.6;
        n.ry = wrap(n.by - scrollY * scrollPar, height);
      }

      // ── connection lines (white, fade with distance + scroll) ───────────
      const baseLine = sys ? 0.5 : 0.42;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.rx - b.rx;
          const dy = a.ry - b.ry;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const d = Math.sqrt(d2);
            const t = 1 - d / maxDist;
            const alpha = t * (baseLine + scrollBoost);
            if (alpha < 0.012) continue;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(a.rx, a.ry);
            ctx.lineTo(b.rx, b.ry);
            ctx.stroke();
          }
        }
      }

      // ── cursor links ────────────────────────────────────────────────────
      if (!rm && pointer.px > -999) {
        const cr = maxDist * 1.45;
        const cr2 = cr * cr;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.rx - pointer.px;
          const dy = n.ry - pointer.py;
          const d2 = dx * dx + dy * dy;
          if (d2 < cr2) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / cr) * 0.28;
            ctx.strokeStyle = `rgba(108, 155, 173, ${alpha.toFixed(3)})`; // steel teal
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.rx, n.ry);
            ctx.lineTo(pointer.px, pointer.py);
            ctx.stroke();
          }
        }
      }

      // ── node dots (tiny white) ──────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // soft halo so each dot reads clearly against the dark base
        if (!rm) {
          ctx.beginPath();
          ctx.arc(n.rx, n.ry, n.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.rx, n.ry, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        prevScrollY = window.scrollY;
        raf = requestAnimationFrame(render);
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    build();
    raf = requestAnimationFrame(render);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
