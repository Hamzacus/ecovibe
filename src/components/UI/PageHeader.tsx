import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  badge?: {
    icon: LucideIcon;
    text: string;
    color?: 'green' | 'blue' | 'purple' | 'yellow' | 'indigo' | 'pink';
  };
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  stats?: Array<{
    value: string | number;
    label: string;
    sublabel?: string;
  }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  actions,
  stats,
  className = ''
}) => {
  const badgeColorClasses = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    pink: 'bg-pink-100 text-pink-700'
  };

  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-6 ${
          badgeColorClasses[badge.color || 'green']
        }`}>
          <badge.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{badge.text}</span>
        </div>
      )}
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>
      )}
      
      {stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              {stat.sublabel && <div className="text-xs text-gray-500">{stat.sublabel}</div>}
            </div>
          ))}
        </div>
      )}
      
      {actions && <div className="mt-8">{actions}</div>}
    </div>
  );
};

export default PageHeader;