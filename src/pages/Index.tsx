import { useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import PhilosophySection from '@/components/PhilosophySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import NoiseOverlay from '@/components/NoiseOverlay';
import CustomCursor from '@/components/CustomCursor';
import GlobalBackground from '@/components/GlobalBackground';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <div ref={scrollContainerRef} className="relative min-h-screen">
        {/* Fixed Global Background - logic for loader is inside */}
        <GlobalBackground
          scrollContainerRef={scrollContainerRef}
          onLoadComplete={() => setIsLoaded(true)}
        />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Noise Texture Overlay */}
        <NoiseOverlay />

        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {/* Navigation */}
              <Navigation />

              {/* Main Content */}
              <main className="relative z-10">
                {/* Hero Section */}
                <HeroSection />

                {/* About Section */}
                <AboutSection />

                {/* Featured Projects */}
                <ProjectsSection />

                {/* Skills Section */}
                <SkillsSection />

                {/* Philosophy Section */}
                <PhilosophySection />

                {/* Contact Section */}
                <ContactSection />
              </main>

              {/* Footer */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
};

export default Index;
