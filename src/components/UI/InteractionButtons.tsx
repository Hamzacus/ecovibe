import React from 'react';
import { Heart, Share2, Bookmark, Eye, MessageCircle } from 'lucide-react';

interface InteractionButtonsProps {
  likes?: number;
  shares?: number;
  saves?: number;
  views?: number;
  comments?: number;
  onLike?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onComment?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

const InteractionButtons: React.FC<InteractionButtonsProps> = ({
  likes,
  shares,
  saves,
  views,
  comments,
  onLike,
  onShare,
  onSave,
  onComment,
  isLiked = false,
  isSaved = false,
  className = '',
  variant = 'horizontal'
}) => {
  const containerClass = variant === 'horizontal' 
    ? 'flex items-center space-x-4' 
    : 'flex flex-col space-y-2';

  return (
    <div className={`${containerClass} text-sm text-gray-500 ${className}`}>
      {views !== undefined && (
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{views.toLocaleString()}</span>
        </div>
      )}
      
      {likes !== undefined && (
        <button 
          onClick={onLike}
          className={`flex items-center space-x-1 transition-colors ${
            isLiked ? 'text-red-500' : 'hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </button>
      )}
      
      {comments !== undefined && (
        <button 
          onClick={onComment}
          className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </button>
      )}
      
      {shares !== undefined && (
        <button 
          onClick={onShare}
          className="flex items-center space-x-1 hover:text-green-500 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{shares}</span>
        </button>
      )}
      
      {saves !== undefined && (
        <button 
          onClick={onSave}
          className={`flex items-center space-x-1 transition-colors ${
            isSaved ? 'text-blue-500' : 'hover:text-blue-500'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          <span>{saves}</span>
        </button>
      )}
    </div>
  );
};

export default InteractionButtons;