import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    pink: 'bg-pink-100 text-pink-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {Icon && <Icon className={iconSizeClasses[size]} />}
      <span>{text}</span>
    </span>
  );
};

export default Badge;