import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 lg:px-12 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground font-light"
          >
            © {currentYear} All rights reserved
          </motion.p>

          {/* Back to Top */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
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
      </div>
    </footer>
  );
};

export default Footer;
