"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    /**
     * Initialize lenis
     */
    const lenis = new Lenis();

    /**
     * Synchronize Lenis scrolling with GSAP's ScrollTrigger
     */
    lenis.on("scroll", ScrollTrigger.update);

    /**
     * Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
     * This ensures Lenis's smooth scroll animation updates on each GSAP tick
     */
    const gsapTicker = (time: number) => {
      // in second
      lenis.raf(time * 1000); // in milisecond
    };
    gsap.ticker.add(gsapTicker);

    /**
     *  Disable lag smoothing in GSAP to prevent any delay in scroll animations
     */
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="wrapper"
      className="w-full min-h-dvh"
    >
      {children}
    </div>
  );
}
