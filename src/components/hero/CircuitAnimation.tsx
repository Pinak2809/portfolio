"use client";

import { useEffect, useRef } from "react";

/**
 * Animated circuit / network topology drawn on a <canvas>.
 * Nodes pulse gently; edges "draw" themselves once on mount.
 * Designed for the mobile hero -- lightweight, GPU-composited,
 * and runs entirely on requestAnimationFrame.
 */

interface Node {
  x: number;
  y: number;
  r: number;
  pulseOffset: number;
}

interface Edge {
  from: number;
  to: number;
  progress: number;
  speed: number;
  delay: number;
}

// Deterministic pseudo-random based on index -- avoids Math.random() for SSR safety
function seeded(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildGraph(
  w: number,
  h: number
): { nodes: Node[]; edges: Edge[] } {
  const cols = 4;
  const rows = 7;
  const cellW = w / cols;
  const cellH = h / rows;
  const nodes: Node[] = [];

  // Place nodes on a jittered grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      const jx = (seeded(idx * 2) - 0.5) * cellW * 0.6;
      const jy = (seeded(idx * 2 + 1) - 0.5) * cellH * 0.5;
      nodes.push({
        x: cellW * (col + 0.5) + jx,
        y: cellH * (row + 0.5) + jy,
        r: 1.5 + seeded(idx * 3) * 1.5,
        pulseOffset: seeded(idx * 5) * Math.PI * 2,
      });
    }
  }

  // Build edges -- connect neighbours and a few longer hops
  const edges: Edge[] = [];
  const addEdge = (a: number, b: number, delayBase: number) => {
    if (a >= 0 && a < nodes.length && b >= 0 && b < nodes.length) {
      edges.push({
        from: a,
        to: b,
        progress: 0,
        speed: 0.3 + seeded(a * 7 + b) * 0.5,
        delay: delayBase + seeded(a * 11 + b * 3) * 1.2,
      });
    }
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      // Right neighbour
      if (col < cols - 1) addEdge(idx, idx + 1, row * 0.25);
      // Below neighbour
      if (row < rows - 1) addEdge(idx, idx + cols, row * 0.25);
      // Diagonal (sparse)
      if (col < cols - 1 && row < rows - 1 && seeded(idx * 13) > 0.55) {
        addEdge(idx, idx + cols + 1, row * 0.3);
      }
      // Skip-one hop for variety (sparse)
      if (col < cols - 2 && seeded(idx * 17) > 0.7) {
        addEdge(idx, idx + 2, row * 0.35);
      }
    }
  }

  return { nodes, edges };
}

export function CircuitAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size to device pixels
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const { nodes, edges } = buildGraph(w, h);

    const ACCENT = "59, 130, 246"; // #3B82F6 as RGB
    let elapsed = 0;
    let prev = 0;
    let rafId: number;

    function draw(time: number) {
      const dt = prev ? (time - prev) / 1000 : 0.016;
      prev = time;
      elapsed += dt;

      ctx!.clearRect(0, 0, w, h);

      // Draw edges
      for (const edge of edges) {
        if (elapsed < edge.delay) continue;
        edge.progress = Math.min(1, edge.progress + dt * edge.speed);

        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const ex = a.x + (b.x - a.x) * edge.progress;
        const ey = a.y + (b.y - a.y) * edge.progress;

        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(ex, ey);
        ctx!.strokeStyle = `rgba(${ACCENT}, ${0.12 + edge.progress * 0.08})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();

        // Travelling pulse dot on completed edges
        if (edge.progress >= 1) {
          const pulse = ((elapsed - edge.delay) * 0.3) % 1;
          const px = a.x + (b.x - a.x) * pulse;
          const py = a.y + (b.y - a.y) * pulse;
          ctx!.beginPath();
          ctx!.arc(px, py, 1, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${ACCENT}, ${0.3 + Math.sin(pulse * Math.PI) * 0.2})`;
          ctx!.fill();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = 0.4 + Math.sin(elapsed * 1.2 + node.pulseOffset) * 0.25;

        // Outer glow
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r + 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT}, ${pulse * 0.08})`;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT}, ${pulse})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    // Handle resize
    const onResize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      // Rebuild graph for new size
      const newGraph = buildGraph(r.width, r.height);
      nodes.length = 0;
      edges.length = 0;
      nodes.push(...newGraph.nodes);
      edges.push(...newGraph.edges);
      elapsed = 0;
      prev = 0;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
}
