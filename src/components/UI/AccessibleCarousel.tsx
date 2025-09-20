import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MoreHorizontal } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  content: React.ReactNode;
}

interface AccessibleCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showThumbnails?: boolean;
  ariaLabel: string;
  className?: string;
}

const AccessibleCarousel: React.FC<AccessibleCarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showThumbnails = false,
  ariaLabel,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !reducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, reducedMotion, autoPlayInterval, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false); // Pause auto-play when user interacts
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? items.length - 1 : prev - 1);
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(items.length - 1);
        break;
      case ' ':
        e.preventDefault();
        togglePlayPause();
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {items.length}: {items[currentIndex]?.title}
      </div>

      {/* Main carousel container */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Carousel content */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: reducedMotion ? 'none' : 'transform 300ms ease-in-out'
          }}
          aria-live="polite"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${items.length}: ${item.title}`}
              aria-hidden={index !== currentIndex}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Previous slide"
          disabled={items.length <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Next slide"
          disabled={items.length <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause button */}
        {autoPlay && !reducedMotion && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {showDots && (
        <div className="flex justify-center space-x-2 mt-4" role="tablist" aria-label="Slide navigation">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-green-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}: ${items[index]?.title}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>
      )}

      {/* Thumbnail navigation */}
      {showThumbnails && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2" role="tablist" aria-label="Thumbnail navigation">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                index === currentIndex
                  ? 'border-green-600 scale-105'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Thumbnail ${index + 1}: ${item.title}`}
            >
              {item.image ? (
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Alternative list view for accessibility */}
      <details className="mt-4">
        <summary className="text-sm text-gray-600 cursor-pointer hover:text-green-600 transition-colors">
          View all items as list (accessible alternative)
        </summary>
        <div className="mt-4 space-y-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
              </div>
              <button
                onClick={() => goToSlide(index)}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default AccessibleCarousel;