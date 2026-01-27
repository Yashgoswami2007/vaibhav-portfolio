import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '@/assets/hero-landscape.jpg';

const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ scale, y }}
        className="absolute inset-0"
      >
        <img 
          src={heroImage}
          alt="Cinematic landscape background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay - stronger gradient for content readability with forest tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/98" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />

      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalBackground;
