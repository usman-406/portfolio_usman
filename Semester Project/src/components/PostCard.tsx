import React, { useState } from 'react';
import { formatRelativeTime } from '../../utils/timeUtils';
import { Post, User } from '../../types';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  author: User;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start space-x-3">
        <Avatar src={author.avatar || ''} alt={author.name} />
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <p className="text-sm text-gray-500">{author.headline}</p>
            <span className="text-xs text-gray-400 mt-1">
              {post.timestamp ? formatRelativeTime(post.timestamp) : 'Recently'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-gray-900">{post.title}</h4>
        <p className="mt-2 text-gray-700">{post.body}</p>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <ThumbsUp size={14} className="text-blue-500" />
          <span>{likeCount}</span>
        </div>
        
        <div className="flex space-x-2 text-xs text-gray-500">
          <span>{post.comments || 0} comments</span>
          <span>•</span>
          <span>{post.shares || 0} shares</span>
        </div>
      </div>

      <div className="flex mt-2 pt-2 border-t border-gray-100">
        <button 
          className={`flex items-center justify-center flex-1 py-2 hover:bg-gray-100 rounded-md transition-colors ${liked ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={handleLike}
        >
          <ThumbsUp size={18} className={liked ? 'fill-current' : ''} />
          <span className="ml-2 text-sm font-medium">Like</span>
        </button>
        
        <button className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
          <MessageSquare size={18} />
          <span className="ml-2 text-sm font-medium">Comment</span>
        </button>
        
        <button className="flex items-center justify-center flex-1 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
          <Share2 size={18} />
          <span className="ml-2 text-sm font-medium">Share</span>
        </button>
      </div>
    </Card>
  );
};

export default PostCard;