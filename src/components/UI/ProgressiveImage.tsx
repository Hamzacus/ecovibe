import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  blurDataURL?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  lazy?: boolean;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  placeholder,
  blurDataURL,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  onError,
  fallback,
  lazy = true
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [reducedMotion, setReducedMotion] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, isInView]);

  const handleLoad = () => {
    setImageState('loaded');
    onLoad?.();
  };

  const handleError = () => {
    setImageState('error');
    onError?.();
  };

  const getPlaceholderSrc = () => {
    if (blurDataURL) return blurDataURL;
    if (placeholder) return placeholder;
    
    // Generate a simple placeholder
    const w = width || 400;
    const h = height || 300;
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="14">
          Loading...
        </text>
      </svg>
    `)}`;
  };

  // Error fallback
  if (imageState === 'error') {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Placeholder/blur image */}
      {imageState === 'loading' && (
        <img
          src={getPlaceholderSrc()}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            reducedMotion ? '' : 'blur-sm'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Loading indicator */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-3">
            <ImageIcon className="w-6 h-6 text-gray-400 animate-pulse" />
          </div>
        </div>
      )}

      {/* Loading state for screen readers */}
      {imageState === 'loading' && (
        <span className="sr-only">Loading image: {alt}</span>
      )}
    </div>
  );
};

export default ProgressiveImage;