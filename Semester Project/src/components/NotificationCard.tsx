import React from 'react';
import { formatRelativeTime } from '../../utils/timeUtils';
import { Notification } from '../../types';
import { MessageSquare, ThumbsUp, Users, Briefcase, Bell } from 'lucide-react';

interface NotificationCardProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare size={18} className="text-blue-500" />;
      case 'like':
        return <ThumbsUp size={18} className="text-blue-500" />;
      case 'connection':
        return <Users size={18} className="text-blue-500" />;
      case 'job':
        return <Briefcase size={18} className="text-blue-500" />;
      default:
        return <Bell size={18} className="text-blue-500" />;
    }
  };

  return (
    <div 
      className={`flex p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
      onClick={onClick}
    >
      <div className="mr-3 mt-1 bg-blue-100 p-2 rounded-full flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
          {notification.content}
        </p>
        <span className="text-xs text-gray-500 mt-1 block">
          {formatRelativeTime(notification.timestamp)}
        </span>
      </div>
      
      {!notification.read && (
        <div className="w-2 h-2 bg-blue-600 rounded-full self-start mt-2"></div>
      )}
    </div>
  );
};

export default NotificationCard;