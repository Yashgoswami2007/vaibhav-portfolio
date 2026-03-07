import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Import Videos
import abandonedHouseVid from '@/assets/abandoned house.mp4';
import headphoneVid from '@/assets/Headphone.mp4';
import primeVid from '@/assets/Prime.mp4';
import redbullVid from '@/assets/Redbull.mp4';
import spaceVid from '@/assets/space reel.mp4';
import visualizerVid from '@/assets/visualizer.mp4';
import gameVid from '@/assets/game.mp4';
import loopVid from '@/assets/Loop.mp4';

// Import posters (confirmed mapping)
import housePoster from '@/assets/forgotten-manor-poster.png';
import headphonePoster from '@/assets/Screenshot 2026-03-06 143345.png';
import primePoster from '@/assets/Screenshot 2026-03-06 143410.png';
import redbullPoster from '@/assets/Screenshot 2026-03-06 143355.png';
import spacePoster from '@/assets/project.png';
import visualizerPoster from '@/assets/project-environment.png';
import kineticPoster from '@/assets/kinetic-resonance-poster.png';
import consolePoster from '@/assets/core-omni-console-poster.png';

const projects = [
  {
    id: 1,
    title: 'THE FORGOTTEN MANOR',
    category: 'Environment Design',
    video: abandonedHouseVid,
    poster: visualizerPoster,
    description: 'Cinematic exploration of industrial decay and atmospheric storytelling.',
  },
  {
    id: 2,
    title: 'SONIC PRECISION',
    category: 'Product Visualization',
    video: headphoneVid,
    poster: headphonePoster,
    description: 'High-fidelity audio equipment rendered with hyper-realistic detail and lighting.',
  },
  {
    id: 3,
    title: 'PRIMAL ENERGY',
    category: 'Brand Identity',
    video: primeVid,
    poster: primePoster,
    description: 'Dynamic motion graphics showcasing the high-energy spirit of Prime.',
  },
  {
    id: 4,
    title: 'BEYOND THE LIMIT',
    category: 'Commercial VFX',
    video: redbullVid,
    poster: redbullPoster,
    description: 'High-speed fluid simulations and technical VFX for extreme sports visuals.',
  },
  {
    id: 5,
    title: 'NEBULAR FRONTIER',
    category: 'Sci-Fi Cinematic',
    video: spaceVid,
    poster: spacePoster,
    description: 'A cosmic journey through distant star systems and celestial landscapes.',
  },
  {
    id: 6,
    title: 'RHYTHM & SPECTRA',
    category: 'Motion Graphics',
    video: visualizerVid,
    poster: housePoster,
    description: 'Audio-reactive abstract visuals designed for immersive digital experiences.',
  },
  {
    id: 7,
    title: 'CORE OMNI-CONSOLE',
    category: 'Product Visualizer',
    video: gameVid,
    poster: consolePoster,
    description: 'A revolutionary next-gen gaming console conceptualized with sleek aesthetics and advanced cooling architecture.',
  },
  {
    id: 8,
    title: 'KINETIC RESONANCE',
    category: 'Motion Study',
    video: loopVid,
    poster: kineticPoster,
    description: 'Four synchronized spheres navigating through a dense, viscous medium in a perpetual orbital dance.',
  },
];

const ProjectVideo = ({ src, poster }: { src: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.5 });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

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
              className="project-card relative aspect-[16/10] rounded-lg overflow-hidden group"
              style={{ perspective: 1000 }}
            >
              {/* Video Component */}
              <ProjectVideo
                src={project.video}
                poster={project.poster}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
                animate={{
                  opacity: hoveredProject === project.id ? 0.8 : 0.6,
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

