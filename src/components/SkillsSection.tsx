import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'Hard Surface Modeling', level: 95 },
  { name: 'Environment Design', level: 90 },
  { name: 'Character Creation', level: 85 },
  { name: 'Vehicle Design', level: 92 },
  { name: 'Product Visualization', level: 88 },
  { name: 'Animation & VFX', level: 80 },
  { name: 'Sculpting', level: 85 },
  { name: 'Texturing & Materials', level: 90 },
];

const tools = [
  'Blender',
  'DaVinci Resolve',
  'Substance Painter',
  'ZBrush',
  'Unreal Engine',
  'After Effects',
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative py-32 lg:py-48 px-6 lg:px-12 bg-card"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label text-accent"
          >
            Expertise
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mt-4 text-foreground"
          >
            Skills & Tools
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Skills Progress */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-display text-sm font-light text-foreground">
                    {skill.name}
                  </span>
                  <span className="font-display text-sm text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-xl font-light text-foreground mb-8"
            >
              Primary Tools
            </motion.h3>

            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: 'hsl(38 90% 55%)' }}
                  className="skill-badge"
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            {/* Additional Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 p-6 border border-border rounded-lg"
            >
              <h4 className="font-display text-lg font-light text-foreground mb-4">
                Additional Capabilities
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Photorealistic Rendering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Cinematic Lighting & Composition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Real-time Visualization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  Asset Optimization for Games
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
