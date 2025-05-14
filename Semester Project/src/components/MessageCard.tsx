import React from 'react';
import { formatRelativeTime } from '../../utils/timeUtils';
import { Message, User } from '../../types';
import Avatar from '../ui/Avatar';

interface MessageCardProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
  onClick: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  sender,
  isCurrentUser,
  onClick,
}) => {
  return (
    <div 
      className={`flex p-3 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors ${!message.read && !isCurrentUser ? 'bg-blue-50' : ''}`}
      onClick={onClick}
    >
      <Avatar
        src={sender.avatar || ''}
        alt={sender.name}
        size="md"
        className="mr-3 flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium truncate ${!message.read && !isCurrentUser ? 'text-gray-900' : 'text-gray-700'}`}>
            {sender.name}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatRelativeTime(message.timestamp)}
          </span>
        </div>
        
        <p className={`text-sm truncate mt-1 ${!message.read && !isCurrentUser ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;