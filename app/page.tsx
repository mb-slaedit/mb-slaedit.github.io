import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ScrollStory } from "@/components/ScrollStory";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export default function Page() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ScrollStory />
      <Services />
      <About />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}