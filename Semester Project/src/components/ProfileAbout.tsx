import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PlusCircle, Edit } from 'lucide-react';
import { User } from '../../types';

interface ProfileAboutProps {
  user: User;
  isCurrentUser: boolean;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ user, isCurrentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const shortAbout = user.about?.substring(0, 300);
  const hasMore = user.about && user.about.length > 300;
  
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">About</h2>
        {isCurrentUser && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            icon={<Edit size={16} />}
          >
            Edit
          </Button>
        )}
      </div>
      
      <div className="text-gray-700">
        {!user.about && isCurrentUser ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-3">Add a summary about yourself</p>
            <Button
              variant="outline"
              className="mx-auto"
              icon={<PlusCircle size={16} />}
            >
              Add About
            </Button>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-line">
              {expanded ? user.about : shortAbout}
              {!expanded && hasMore && '...'}
            </p>
            
            {hasMore && (
              <button
                className="text-blue-600 font-medium hover:underline mt-2"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default ProfileAbout;