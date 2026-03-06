import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 lg:px-12 border-t border-border backdrop-blur-md bg-background/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <span className="font-display text-xl font-medium tracking-tight text-foreground">
              VM
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="text-sm text-muted-foreground font-light">
              Vaibhav Mishra
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted-foreground font-light"
          >
            © {currentYear} All rights reserved
          </motion.p>

          {/* Back to Top */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 font-display tracking-wider"
          >
            <span>Back to top</span>
            <svg
              className="w-4 h-4 rotate-[-90deg]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>

        {/* Developer Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex justify-start"
        >
          <a
            href="https://www.linkedin.com/in/yash-goswami-551590374/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-muted-foreground/30 hover:text-accent/50 transition-colors duration-300"
          >
            Contact Developer
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
