import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contactLinks = [
  {
    label: 'Email',
    value: 'hello@vaibhavmishra.com',
    href: 'mailto:hello@vaibhavmishra.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vaibhavmishra',
    href: 'https://linkedin.com',
  },
  {
    label: 'Instagram',
    value: '@vaibhav.3dart',
    href: 'https://instagram.com',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-32 lg:py-48 px-6 lg:px-12"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label text-accent"
            >
              Get in Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="section-title mt-4 text-foreground"
            >
              Let's create
              <br />
              <span className="text-muted-foreground">something epic</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground font-light max-w-md"
            >
              Available for AAA studio roles, freelance projects, and professional collaborations. Let's bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8"
            >
              <a 
                href="mailto:hello@vaibhavmishra.com"
                className="btn-accent inline-block"
              >
                Start a Conversation
              </a>
            </motion.div>
          </div>

          {/* Right Column - Contact Links */}
          <div className="lg:pt-16">
            <div className="space-y-8">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="group block p-6 border border-border rounded-lg hover:border-accent/50 transition-colors duration-300"
                >
                  <span className="block text-xs font-display tracking-widest uppercase text-muted-foreground mb-2">
                    {link.label}
                  </span>
                  <span className="flex items-center justify-between">
                    <span className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                      {link.value}
                    </span>
                    <motion.svg
                      className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
