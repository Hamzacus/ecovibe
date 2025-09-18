import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BaseCardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
}

interface StatCardProps extends BaseCardProps {
  variant: 'stat';
  icon: LucideIcon;
  value: string | number;
  label: string;
  sublabel?: string;
  color?: 'green' | 'blue' | 'purple' | 'yellow' | 'orange' | 'red';
  trend?: string;
}

interface ContentCardProps extends BaseCardProps {
  variant: 'content';
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badges?: Array<{ text: string; color?: string }>;
  actions?: React.ReactNode;
  rating?: number;
  metadata?: Array<{ icon: LucideIcon; text: string }>;
}

interface SimpleCardProps extends BaseCardProps {
  variant: 'simple';
}

type CardProps = StatCardProps | ContentCardProps | SimpleCardProps;

const Card: React.FC<CardProps> = (props) => {
  const baseClasses = `bg-white rounded-2xl shadow-sm border border-gray-100 ${
    props.hover !== false ? 'hover:shadow-lg transition-all duration-300' : ''
  } ${props.onClick ? 'cursor-pointer' : ''} ${props.className || ''}`;

  if (props.variant === 'stat') {
    const { icon: Icon, value, label, sublabel, color = 'green', trend } = props;
    
    const colorClasses = {
      green: 'from-green-50 to-emerald-50 border-green-200 text-green-600',
      blue: 'from-blue-50 to-sky-50 border-blue-200 text-blue-600',
      purple: 'from-purple-50 to-pink-50 border-purple-200 text-purple-600',
      yellow: 'from-yellow-50 to-orange-50 border-yellow-200 text-yellow-600',
      orange: 'from-orange-50 to-red-50 border-orange-200 text-orange-600',
      red: 'from-red-50 to-pink-50 border-red-200 text-red-600'
    };

    const iconColorClasses = {
      green: 'bg-green-600',
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      yellow: 'bg-yellow-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600'
    };

    return (
      <div 
        className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 border ${props.className || ''}`}
        onClick={props.onClick}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconColorClasses[color]} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <span className={`text-xs bg-white/80 ${color === 'green' ? 'text-green-600' : `text-${color}-600`} px-2 py-1 rounded-full`}>
              {trend}
            </span>
          )}
        </div>
        <div>
          <p className={`text-2xl font-bold ${color === 'green' ? 'text-green-600' : `text-${color}-600`}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="text-sm text-gray-600">{label}</p>
          {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
        </div>
      </div>
    );
  }

  if (props.variant === 'content') {
    const { image, title, subtitle, description, badges, actions, rating, metadata } = props;
    
    return (
      <div className={baseClasses} onClick={props.onClick}>
        {image && (
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            {rating && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          
          {description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          )}
          
          {metadata && (
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              {metadata.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-1">
                    <Icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          {badges && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    badge.color || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
          
          {actions && <div className="mt-4">{actions}</div>}
        </div>
      </div>
    );
  }

  // Simple variant
  return (
    <div className={baseClasses} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;