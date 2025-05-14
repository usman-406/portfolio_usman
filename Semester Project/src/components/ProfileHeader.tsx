import React from 'react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { MapPin, Briefcase, Link as LinkIcon, Edit } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  isConnected: boolean;
  onConnect: () => void;
  onMessage: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isCurrentUser,
  isConnected,
  onConnect,
  onMessage,
}) => {
  return (
    <Card className="mb-4 relative">
      {/* Cover image */}
      <div className="h-40 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-lg overflow-hidden">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Avatar and actions */}
      <div className="px-6 pb-6">
        <div className="flex justify-between">
          <div className="-mt-16">
            <Avatar
              src={user.avatar || ''}
              alt={user.name}
              size="xl"
              className="border-4 border-white"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            {isCurrentUser ? (
              <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant={isConnected ? 'outline' : 'primary'}
                  size="sm"
                  onClick={onConnect}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </Button>
                <Button variant="outline" size="sm" onClick={onMessage}>
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* User info */}
        <div className="mt-3">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-700 mt-1">{user.headline}</p>

          <div className="flex flex-wrap items-center mt-2 text-gray-500 text-sm">
            {user.location && (
              <div className="flex items-center mr-4 mb-1">
                <MapPin size={14} className="mr-1" />
                <span>{user.location}</span>
              </div>
            )}
            {user.company?.name && (
              <div className="flex items-center mr-4 mb-1">
                <Briefcase size={14} className="mr-1" />
                <span>{user.company.name}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center mb-1">
                <LinkIcon size={14} className="mr-1" />
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {user.website}
                </a>
              </div>
            )}
          </div>
          
          <div className="mt-2 text-blue-600 hover:underline cursor-pointer">
            <span>{user.connections || 0} connections</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;