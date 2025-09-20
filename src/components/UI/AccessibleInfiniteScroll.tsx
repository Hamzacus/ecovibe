import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, ChevronDown, Grid, List, RefreshCw } from 'lucide-react';

interface InfiniteScrollItem {
  id: string;
  [key: string]: any;
}

interface AccessibleInfiniteScrollProps<T extends InfiniteScrollItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  error?: string | null;
  pageSize?: number;
  ariaLabel: string;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  enableManualLoad?: boolean;
  showViewToggle?: boolean;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

function AccessibleInfiniteScroll<T extends InfiniteScrollItem>({
  items,
  renderItem,
  loadMore,
  hasMore,
  loading,
  error,
  pageSize = 10,
  ariaLabel,
  emptyMessage = 'No items found',
  loadingMessage = 'Loading more items...',
  className = '',
  enableManualLoad = false,
  showViewToggle = false,
  viewMode = 'grid',
  onViewModeChange
}: AccessibleInfiniteScrollProps<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

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

  // Update displayed items when items change
  useEffect(() => {
    setDisplayedItems(items.slice(0, currentPage * pageSize));
  }, [items, currentPage, pageSize]);

  // Intersection Observer for automatic loading
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading && !enableManualLoad) {
      loadMore();
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, loading, loadMore, enableManualLoad]);

  useEffect(() => {
    if (!enableManualLoad && !reducedMotion) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        threshold: 0.1,
        rootMargin: '100px'
      });

      if (loadMoreRef.current) {
        observerRef.current.observe(loadMoreRef.current);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, enableManualLoad, reducedMotion]);

  const handleManualLoad = async () => {
    await loadMore();
    setCurrentPage(prev => prev + 1);
    
    // Announce to screen readers
    if (announcementRef.current) {
      announcementRef.current.textContent = `Loaded ${pageSize} more items. Total: ${displayedItems.length + pageSize} items.`;
    }
  };

  const handleRetry = () => {
    loadMore();
  };

  // Skip to content functionality
  const skipToContent = () => {
    const firstItem = document.querySelector('[data-scroll-item="0"]') as HTMLElement;
    if (firstItem) {
      firstItem.focus();
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Screen reader announcements */}
      <div ref={announcementRef} className="sr-only" aria-live="polite" aria-atomic="true" />
      
      {/* Skip to content link */}
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to content
      </button>

      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{ariaLabel}</h2>
          <p className="text-sm text-gray-600">
            Showing {displayedItems.length} of {items.length} items
            {hasMore && ` (${items.length - displayedItems.length} more available)`}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View toggle */}
          {showViewToggle && onViewModeChange && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1" role="tablist">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                role="tab"
                aria-selected={viewMode === 'grid'}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                role="tab"
                aria-selected={viewMode === 'list'}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Refresh button */}
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-600 hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
            aria-label="Refresh content"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content grid/list */}
      <div
        className={`${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}
        role="feed"
        aria-label={ariaLabel}
        aria-busy={loading}
      >
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            data-scroll-item={index}
            tabIndex={-1}
            className="focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8" aria-live="polite">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <span className="text-gray-600">{loadingMessage}</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-8" role="alert">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Content</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Manual load more button */}
      {(enableManualLoad || reducedMotion) && hasMore && !loading && (
        <div className="text-center py-6">
          <button
            onClick={handleManualLoad}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-describedby="load-more-description"
          >
            <span className="flex items-center space-x-2">
              <ChevronDown className="w-5 h-5" />
              <span>Load More ({items.length - displayedItems.length} remaining)</span>
            </span>
          </button>
          <p id="load-more-description" className="text-sm text-gray-600 mt-2">
            Click to load {Math.min(pageSize, items.length - displayedItems.length)} more items
          </p>
        </div>
      )}

      {/* End of content indicator */}
      {!hasMore && displayedItems.length > 0 && (
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-gray-600">You've reached the end of the content</p>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
            }}
            className="mt-2 text-green-600 hover:text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg px-2 py-1"
          >
            Back to top
          </button>
        </div>
      )}

      {/* Empty state */}
      {displayedItems.length === 0 && !loading && (
        <div className="text-center py-12" role="status">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Content Available</h3>
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      )}

      {/* Intersection observer target */}
      <div ref={loadMoreRef} className="h-4" aria-hidden="true" />
    </div>
  );
}

export default AccessibleInfiniteScroll;