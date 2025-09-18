import React from 'react';
import { Plus, Search, Filter, Download, Share2, Bookmark, Heart } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, className = '' }) => {
  const getButtonStyles = (variant: QuickAction['variant'] = 'secondary') => {
    switch (variant) {
      case 'primary':
        return 'bg-green-600 text-white hover:bg-green-700 shadow-sm';
      case 'ghost':
        return 'text-gray-600 hover:text-green-600 hover:bg-green-50';
      default:
        return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getButtonStyles(action.variant)}`}
            title={action.label}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;