import BenefitsSection from '@/sections/benefits-section';
import FlavorsSection from '@/sections/flavors-section';
import FooterSection from '@/sections/footer-section';
import HeroSection from '@/sections/hero-section';
import MessageSection from '@/sections/message-section';
import NutritionSection from '@/sections/nutrition-section';
import TestimonialSection from '@/sections/testimonial-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <MessageSection />
      <FlavorsSection />
      <NutritionSection />
      <BenefitsSection />
      <TestimonialSection />
      <FooterSection />
    </>
  );
}
