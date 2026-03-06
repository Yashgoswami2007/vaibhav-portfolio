import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Import all frames using Vite's glob import
// For images, Vite returns modules with a default export that is the URL
const frameModules = import.meta.glob('@/assets/frames/*.jpg', {
  eager: true
}) as Record<string, { default: string }>;

// Sort frames by their numeric index and extract URLs
const sortedFramePaths = Object.entries(frameModules)
  .map(([path, module]) => ({
    path,
    url: (module as { default: string }).default
  }))
  .sort((a, b) => {
    const aMatch = a.path.match(/frame_(\d+)\.jpg$/);
    const bMatch = b.path.match(/frame_(\d+)\.jpg$/);
    const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
    const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
    return aNum - bNum;
  })
  .map(({ url }) => url);

interface GlobalBackgroundProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  onLoadComplete?: () => void;
}

const GlobalBackground = ({ scrollContainerRef, onLoadComplete }: GlobalBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Track scroll progress of the entire page container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end']
  });

  // Map scroll progress (0-1) to frame index (0 to totalFrames-1)
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, sortedFramePaths.length - 1]
  );

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];

      sortedFramePaths.forEach((framePath, index) => {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            setLoadingProgress((prev) => prev + 1);
            resolve(img);
          };
          img.onerror = reject;
          img.src = framePath;
        });
        imagePromises.push(promise);
      });

      try {
        imagesRef.current = await Promise.all(imagePromises);
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
      } catch (error) {
        console.error('Error loading frames:', error);
      }
    };

    loadImages();
  }, []);

  // Update canvas based on scroll position
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw current frame
    const drawFrame = (frameIdx: number) => {
      const clampedIndex = Math.max(0, Math.min(Math.floor(frameIdx), imagesRef.current.length - 1));
      const img = imagesRef.current[clampedIndex];
      if (!img) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate scaling to cover entire canvas while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        // Image is wider - fit to height
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        // Image is taller - fit to width
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      // Draw image with smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Subscribe to frame index changes
    const unsubscribe = frameIndex.on('change', (latest) => {
      drawFrame(latest);
    });

    // Initial draw
    drawFrame(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [isLoaded, frameIndex]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-background z-[1] flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">
              loading experience
            </div>
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(loadingProgress / sortedFramePaths.length) * 100}%` }}
              />
            </div>
            <div className="text-muted-foreground text-xs mt-2">
              {loadingProgress} / {sortedFramePaths.length}
            </div>
          </div>
        </div>
      )}

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none z-[1]" />
    </div>
  );
};

export default GlobalBackground;
