import React from 'react';
import { ArrowLeft, ArrowRight, Grid, List, Filter, SortAsc } from 'lucide-react';

interface NavigationContextProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showViewToggle?: boolean;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  showSort?: boolean;
  onSortClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const NavigationContext: React.FC<NavigationContextProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  showViewToggle = false,
  viewMode = 'grid',
  onViewModeChange,
  showFilter = false,
  onFilterClick,
  showSort = false,
  onSortClick,
  actions,
  className = ''
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          
          {title && (
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {showViewToggle && onViewModeChange && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid view"
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
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}

          {showFilter && onFilterClick && (
            <button
              onClick={onFilterClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          )}

          {showSort && onSortClick && (
            <button
              onClick={onSortClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <SortAsc className="w-4 h-4" />
              <span className="text-sm font-medium">Sort</span>
            </button>
          )}

          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationContext;