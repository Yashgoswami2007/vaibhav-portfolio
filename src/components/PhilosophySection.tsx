import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 border border-muted-foreground/20 rounded-full" />
        <div className="absolute inset-8 border border-muted-foreground/20 rounded-full" />
        <div className="absolute inset-16 border border-muted-foreground/20 rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Mark */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="block font-display text-[200px] leading-none text-foreground mb-[-80px]"
          >
            "
          </motion.span>

          {/* Philosophy Quote Container */}
          <div className="relative mt-8">
            <div className="relative z-10 p-10 md:p-16 rounded-3xl bg-background/40 backdrop-blur-2xl border border-white/5 shadow-2xl overflow-hidden">
              {/* Subtle interior glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

              <motion.blockquote
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground">
                  The boundary between the virtual and the visceral is where I thrive.
                  Every environment I build, every product I visualize, is a meticulous blend of
                  <span className="text-accent"> Blender's precision</span> and
                  <span className="text-accent"> DaVinci's cinematic soul</span>.
                </p>
              </motion.blockquote>

              {/* Attribution inside the box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 relative z-10"
              >
                <div className="w-12 h-px bg-accent mx-auto mb-6" />
                <span className="font-display text-sm tracking-widest uppercase text-muted-foreground">
                  Artistic Philosophy
                </span>
              </motion.div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -inset-10 bg-accent/5 blur-[100px] rounded-full pointer-events-none opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
