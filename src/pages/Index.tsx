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

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Noise Texture Overlay */}
        <NoiseOverlay />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
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
      </div>
    </SmoothScroll>
  );
};

export default Index;
