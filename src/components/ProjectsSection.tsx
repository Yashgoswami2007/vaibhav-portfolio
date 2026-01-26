import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import projectVehicle from '@/assets/project-vehicle.jpg';
import projectEnvironment from '@/assets/project-environment.jpg';
import projectCharacter from '@/assets/project-character.jpg';
import projectProduct from '@/assets/project-product.jpg';

const projects = [
  {
    id: 1,
    title: 'VANGUARD MK-VII',
    category: 'Hard Surface / Vehicle',
    image: projectVehicle,
    description: 'Next-gen combat vehicle design for sci-fi universe',
  },
  {
    id: 2,
    title: 'ABANDONED FOUNDRY',
    category: 'Environment Design',
    image: projectEnvironment,
    description: 'Post-apocalyptic industrial environment',
  },
  {
    id: 3,
    title: 'SENTINEL ARMOR',
    category: 'Character Design',
    image: projectCharacter,
    description: 'Futuristic power armor concept',
  },
  {
    id: 4,
    title: 'CHRONOS WATCH',
    category: 'Product Visualization',
    image: projectProduct,
    description: 'Premium product render showcase',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto mb-16 lg:mb-24">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label text-accent"
        >
          Selected Work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title mt-4 text-foreground"
        >
          Featured Projects
        </motion.h2>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 80, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="project-card relative aspect-[16/10] rounded-lg overflow-hidden"
              style={{ perspective: 1000 }}
            >
              {/* Image */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  scale: hoveredProject === project.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                animate={{
                  opacity: hoveredProject === project.id ? 0.9 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <motion.span
                  animate={{
                    y: hoveredProject === project.id ? 0 : 10,
                    opacity: hoveredProject === project.id ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-display tracking-widest uppercase text-accent mb-2"
                >
                  {project.category}
                </motion.span>

                <motion.h3
                  animate={{
                    y: hoveredProject === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-2xl lg:text-3xl font-medium tracking-tight text-foreground"
                >
                  {project.title}
                </motion.h3>

                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-sm text-muted-foreground font-light"
                    >
                      {project.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* View Project Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    y: hoveredProject === project.id ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-4"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-display tracking-wider text-foreground group cursor-pointer">
                    View Project
                    <motion.svg
                      animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.div>
              </div>

              {/* Border Highlight on Hover */}
              <motion.div
                className="absolute inset-0 border-2 border-accent/0 rounded-lg pointer-events-none"
                animate={{
                  borderColor: hoveredProject === project.id ? 'hsl(38 90% 55% / 0.3)' : 'hsl(38 90% 55% / 0)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
