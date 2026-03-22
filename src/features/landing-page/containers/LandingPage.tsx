"use client";

import ScrollProvider from "@/components/providers/ScrollProvider";
import { useLogout } from "@/hooks/auth.hooks";
import useUser from "@/hooks/users.hooks";
import { useRouter } from "next/navigation";
import Navbar from "../sections/Navbar";
import Problem from "../sections/Problem";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Career from "../sections/Career";
import Step from "../sections/Step";
import Feature from "../sections/Feature";
import Footer from "../sections/Footer";

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
