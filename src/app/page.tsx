"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import BeyondSection from "@/components/BeyondSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [initialTab, setInitialTab] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash === "#work") {
      setInitialTab("Automations");
      // Wait a tick for the section to mount, then scroll
      setTimeout(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <WorkSection initialTab={initialTab} />
      <BeyondSection />
      <Footer />
    </main>
  );
}
