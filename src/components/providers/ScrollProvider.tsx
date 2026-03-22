"use client";

import { useLandingPageMenuStore } from "@/stores/useLandingPageMenuStore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useLenis()
  const { isOpen } = useLandingPageMenuStore()

  useEffect(() => {
    if (!lenis) return

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
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; 
    } else {
      lenis.start();
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      lenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  return (
    <div
      id="wrapper"
      className="w-full min-h-dvh relative"
    >
      {children}
    </div>
  );
}
