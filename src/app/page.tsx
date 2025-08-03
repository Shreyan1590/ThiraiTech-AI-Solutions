import Header from '@/components/shared/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/shared/Footer';
import ProcessSection from '@/components/sections/ProcessSection';
import FounderSection from '@/components/sections/FounderSection';
import ProjectsSection from '@/components/sections/ProjectsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          <AboutSection />
          <FounderSection />
          <WhyChooseUsSection />
          <ProcessSection />
          <ProductsSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
