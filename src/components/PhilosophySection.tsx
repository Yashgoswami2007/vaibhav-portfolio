import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Elements */}
      <motion.div 
        style={{ x }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 border border-muted-foreground/20 rounded-full" />
        <div className="absolute inset-8 border border-muted-foreground/20 rounded-full" />
        <div className="absolute inset-16 border border-muted-foreground/20 rounded-full" />
      </motion.div>

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

          {/* Philosophy Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-foreground">
              Great art isn't about perfection—it's about{' '}
              <span className="text-accent">conviction</span>. Every polygon 
              placed with purpose, every light positioned to evoke emotion. 
              The craft is in the discipline.
            </p>
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <span className="font-display text-sm tracking-widest uppercase text-muted-foreground">
              Artistic Philosophy
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
