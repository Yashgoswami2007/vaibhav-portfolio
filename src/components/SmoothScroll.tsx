import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  // Simplified smooth scroll - Lenis can be added back later
  return <>{children}</>;
};

export default SmoothScroll;
