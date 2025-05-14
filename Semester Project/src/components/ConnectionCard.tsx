import React from 'react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ConnectionCardProps {
  user: User;
  isConnected: boolean;
  isPending?: boolean;
  onConnect: () => void;
  onMessage: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  user,
  isConnected,
  isPending = false,
  onConnect,
  onMessage,
}) => {
  return (
    <Card className="mb-4">
      <div className="flex">
        <Avatar
          src={user.avatar || ''}
          alt={user.name}
          size="lg"
          className="mr-4"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-700 line-clamp-2">{user.headline}</p>
          <p className="text-xs text-gray-500 mt-1">{user.location}</p>
          
          <div className="flex mt-3 space-x-2">
            {isConnected ? (
              <Button variant="outline" size="sm" onClick={onMessage}>
                Message
              </Button>
            ) : (
              <Button
                variant={isPending ? 'outline' : 'primary'}
                size="sm"
                onClick={onConnect}
              >
                {isPending ? 'Pending' : 'Connect'}
              </Button>
            )}
            
            {isConnected && (
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConnectionCard;