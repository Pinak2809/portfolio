"use client";

import { useRef } from "react";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useHeroScroll } from "./HeroSection";

interface LottieRunnerProps {
  animationData: Record<string, unknown>;
}

/**
 * Scroll-driven Lottie runner.
 *
 * Since the Lottie is a running cycle (loops), we cycle through its frames
 * multiple times during the running phase so the legs keep moving.
 * During the jump we hold a mid-stride frame.
 * During landing we hold the last frame.
 *
 * Framer Motion handles position, jump arc, rotation, and squash.
 */
export function LottieRunner({ animationData }: LottieRunnerProps) {
  const scrollYProgress = useHeroScroll();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Horizontal position (vw)
  const xPercent = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35, 0.42, 0.50, 0.58, 0.65, 0.80, 1.0],
    [20, 20, 42, 46, 55, 65, 75, 85, 85]
  );

  // Jump arc
  const jumpY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 1.0],
    [0, 0, -50, -100, -140, -100, -50, -20, -20]
  );

  // Lean / rotation
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35, 0.45, 0.50, 0.55, 0.65, 0.80],
    [0, -3, -3, -10, -12, -10, -3, 0]
  );

  // Landing squash
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.63, 0.67, 0.72, 1.0],
    [1, 1, 0.85, 1, 1]
  );
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.63, 0.67, 0.72, 1.0],
    [1, 1, 1.15, 1, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.03, 1.0],
    [0, 1, 1]
  );

  const leftPos = useTransform(xPercent, (v) => `${v}vw`);

  // Drive Lottie frame by scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!lottieRef.current) return;
    const anim = lottieRef.current;
    const totalFrames = (anim.getDuration(true) as number) || 30;

    if (progress <= 0.05) {
      // Idle — hold first frame
      anim.goToAndStop(0, true);
    } else if (progress < 0.35) {
      // Running phase — cycle through run animation multiple times
      // Map 0.05-0.35 scroll range to ~4 full run cycles
      const runProgress = (progress - 0.05) / (0.35 - 0.05);
      const cycles = 4;
      const frameInCycle = (runProgress * cycles * totalFrames) % totalFrames;
      anim.goToAndStop(Math.floor(frameInCycle), true);
    } else if (progress < 0.65) {
      // Jump phase — hold a mid-stride frame (looks like leaping)
      const midFrame = Math.floor(totalFrames * 0.4);
      anim.goToAndStop(midFrame, true);
    } else if (progress < 0.80) {
      // Landing — play through the cycle once slowly
      const landProgress = (progress - 0.65) / (0.80 - 0.65);
      const frame = Math.floor(landProgress * (totalFrames - 1));
      anim.goToAndStop(frame, true);
    } else {
      // Settled — hold first frame
      anim.goToAndStop(0, true);
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <motion.div
        className="absolute"
        style={{
          left: leftPos,
          bottom: "38%",
          x: "-50%",
          y: jumpY,
          rotate,
          scaleX,
          scaleY,
          opacity,
          transformOrigin: "center bottom",
        }}
      >
        <div style={{ width: 80, height: 100 }}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay={false}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
