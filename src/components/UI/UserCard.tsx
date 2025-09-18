import React from 'react';
import { Star, MapPin, Shield } from 'lucide-react';
import Badge from './Badge';

interface UserCardProps {
  id: string;
  name: string;
  avatar: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  specialties?: string[];
  languages?: string[];
  price?: {
    amount: number;
    currency: string;
    period: string;
  };
  about?: string;
  verified?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  avatar,
  location,
  rating,
  reviewCount,
  specialties = [],
  languages = [],
  price,
  about,
  verified = false,
  onClick,
  actions,
  className = ''
}) => {
  return (
    <div 
      className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-16 h-16 rounded-full border-3 border-white shadow-md"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {location && (
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </p>
          )}
          {rating && (
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
              {reviewCount && (
                <span className="text-sm text-gray-500 ml-1">({reviewCount} reviews)</span>
              )}
            </div>
          )}
        </div>
      </div>

      {about && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{about}</p>
      )}

      {specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty) => (
            <Badge 
              key={specialty}
              text={specialty}
              variant="info"
              size="sm"
            />
          ))}
          {specialties.length > 3 && (
            <Badge 
              text={`+${specialties.length - 3} more`}
              variant="default"
              size="sm"
            />
          )}
        </div>
      )}

      {languages.length > 0 && (
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <span>Languages:</span>
          <span className="font-medium">{languages.join(', ')}</span>
        </div>
      )}

      {(price || actions) && (
        <div className="flex items-center justify-between">
          {price && (
            <div>
              <span className="text-lg font-bold text-green-600">
                {price.amount} {price.currency}
              </span>
              <span className="text-sm text-gray-500">/{price.period}</span>
            </div>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}
    </div>
  );
};

export default UserCard;