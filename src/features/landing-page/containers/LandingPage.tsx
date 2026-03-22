"use client";

import ScrollProvider from "@/components/providers/ScrollProvider";
import { ReactLenis } from 'lenis/react';
import About from "../sections/About";
import Career from "../sections/Career";
import Feature from "../sections/Feature";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";
import Problem from "../sections/Problem";
import Step from "../sections/Step";

const LandingPage = () => {
  return (
    <ReactLenis root>
      <ScrollProvider>
        <Navbar />
        <main className="w-full">
          <Hero />
          <About />
          <Problem />
          <Career />
          <Step />
          <Feature />
        </main>
        <Footer />
      </ScrollProvider>
    </ReactLenis>
  );
};

export default LandingPage;
