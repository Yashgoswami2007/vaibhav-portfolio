import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Import all frames using Vite's glob import
// We switched from JPG to WebP for 60% smaller file sizes
const frameModules = import.meta.glob('@/assets/frames/*.webp', {
  eager: true
}) as Record<string, { default: string }>;

// Sort frames by their numeric index and extract URLs
const sortedFramePaths = Object.entries(frameModules)
  .map(([path, module]) => ({
    path,
    url: (module as { default: string }).default
  }))
  .sort((a, b) => {
    const aMatch = a.path.match(/frame_(\d+)\.webp$/);
    const bMatch = b.path.match(/frame_(\d+)\.webp$/);
    const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
    const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
    return aNum - bNum;
  })
  .map(({ url }) => url);

// Critical frames required before hiding the loading screen
const CRITICAL_FRAMES_COUNT = 20;

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
    let loadedCount = 0;
    const totalFrames = sortedFramePaths.length;

    const loadImages = async () => {
      // Create a pool of image elements
      imagesRef.current = new Array(totalFrames);

      const promises = sortedFramePaths.map((framePath, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            imagesRef.current[index] = img;
            loadedCount++;
            setLoadingProgress(loadedCount);

            // If we've reached the critical threshold, allow the site to be interactive
            if (loadedCount === CRITICAL_FRAMES_COUNT && !isLoaded) {
              setIsLoaded(true);
              if (onLoadComplete) onLoadComplete();
            }

            // If all images are loaded, ensure isLoaded is true even if threshold was higher
            if (loadedCount === totalFrames && !isLoaded) {
              setIsLoaded(true);
              if (onLoadComplete) onLoadComplete();
            }

            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame: ${framePath}`);
            loadedCount++; // Count as "processed" to avoid blocking indefinitely
            resolve();
          };
          img.src = framePath;
        });
      });

      // We don't await Promise.all(promises) because we want to setIsLoaded early
      // but we still want the browser to keep downloading in the background.
    };

    loadImages();
  }, [onLoadComplete]);

  // Update canvas based on scroll position
  useEffect(() => {
    // We allow drawing even if not "fully" loaded, as long as we have the first 20 frames
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawFrame = (frameIdx: number) => {
      const clampedIndex = Math.max(0, Math.min(Math.floor(frameIdx), sortedFramePaths.length - 1));
      const img = imagesRef.current[clampedIndex];

      // If the image isn't loaded yet, try to find the nearest previous loaded frame
      // to avoid flickering/blanks during background loading
      let displayImg = img;
      if (!displayImg) {
        for (let i = clampedIndex - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            displayImg = imagesRef.current[i];
            break;
          }
        }
      }

      if (!displayImg) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspect = displayImg.width / displayImg.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium'; // Balanced performance
      ctx.drawImage(displayImg, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = frameIndex.on('change', (latest) => {
      drawFrame(latest);
    });

    drawFrame(frameIndex.get());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [isLoaded, frameIndex]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Loading overlay - only show until critical frames are loaded */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-background z-[1] flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-2">
              initializing cinematic world
            </div>
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${Math.min((loadingProgress / CRITICAL_FRAMES_COUNT) * 100, 100)}%` }}
              />
            </div>
            <div className="text-muted-foreground text-xs mt-2">
              {Math.min(loadingProgress, CRITICAL_FRAMES_COUNT)} / {CRITICAL_FRAMES_COUNT}
            </div>
          </div>
        </div>
      )}

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{
          opacity: loadingProgress > 0 ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none z-[1]" />
    </div>
  );
};

export default GlobalBackground;

