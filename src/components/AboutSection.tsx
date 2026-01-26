import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Happy Clients' },
  ];

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
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed font-light"
            >
              I'm a 3D artist specializing in hard surface modeling, environment design, and cinematic visualization. My work spans from hyper-detailed vehicles to atmospheric game environments, all crafted with the precision and visual fidelity expected in AAA productions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-muted-foreground leading-relaxed font-light mt-6"
            >
              Working primarily in Blender and DaVinci Resolve, I bring concepts to life with meticulous attention to detail, realistic materials, and cinematic lighting that tells a story.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-default"
                >
                  <motion.span
                    className="block font-display text-3xl lg:text-4xl font-light text-foreground group-hover:text-accent transition-colors duration-300"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="block mt-2 text-sm text-muted-foreground font-light">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
