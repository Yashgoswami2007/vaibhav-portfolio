import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-ambient-drift" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Label & Title */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label text-accent"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-title mt-4 text-foreground"
            >
              Building worlds
              <br />
              <span className="text-muted-foreground">that feel real</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-24 h-px bg-accent mt-8 origin-left"
            />
          </div>

          {/* Right Column - Content */}
          <div className="relative">
            <div className="relative z-10 p-8 lg:p-10 rounded-2xl bg-background/40 backdrop-blur-2xl border border-white/5 shadow-2xl overflow-hidden">
              {/* Subtle interior glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-foreground/90 leading-relaxed font-light relative z-10"
              >
                I'm a 3D artist dedicated to crafting immersive digital experiences through advanced environment creation and hyper-realistic product visualization. My process bridges the gap between imagination and reality, utilizing the power of Blender for detailed modeling and DaVinci Resolve for cinematic color grading and final output.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-foreground/80 leading-relaxed font-light mt-6 relative z-10"
              >
                Whether it's designing expansive architectural landscapes or showcasing the intricate details of a premium product, my focus is always on visual storytelling, realistic material physics, and atmospheric lighting that resonates with the audience.
              </motion.p>
            </div>

            {/* Decorative background glow for the blur box */}
            <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full pointer-events-none opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
