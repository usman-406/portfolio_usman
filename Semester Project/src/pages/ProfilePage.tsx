import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../types';
import { fetchUser } from '../services/api';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileAbout from '../components/profile/ProfileAbout';
import ProfileExperience from '../components/profile/ProfileExperience';
import ProfileSkills from '../components/profile/ProfileSkills';

interface ProfilePageProps {
  currentUser: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        
        // If viewing current user's profile
        if (id === currentUser.id.toString()) {
          setUser(currentUser);
          setIsConnected(false);
          return;
        }
        
        const userId = parseInt(id || '0', 10);
        const userData = await fetchUser(userId);
        
        setUser(userData);
        
        // Simulate connection status (in a real app, this would come from the API)
        setIsConnected(userId % 2 === 0);
        
        setError(null);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [id, currentUser]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleMessage = () => {
    console.log('Open message thread with:', user?.name);
    // In a real app, this would navigate to the messaging page or open a chat
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-10 h-10 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <p className="mt-3 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-red-700 text-center mt-6">
        {error || 'User not found'}
      </div>
    );
  }

  return (
    <div className="pt-6">
      <ProfileHeader
        user={user}
        isCurrentUser={user.id === currentUser.id}
        isConnected={isConnected}
        onConnect={handleConnect}
        onMessage={handleMessage}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProfileAbout user={user} isCurrentUser={user.id === currentUser.id} />
          <ProfileExperience user={user} isCurrentUser={user.id === currentUser.id} />
        </div>
        
        <div className="space-y-4">
          <ProfileSkills user={user} isCurrentUser={user.id === currentUser.id} />
          
          {/* People also viewed section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">People also viewed</h2>
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, i) => {
                const viewedUserId = (user.id + i + 1) % 10 || 1;
                return (
                  <div key={i} className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <img 
                        src={`https://randomuser.me/api/portraits/${viewedUserId % 2 === 0 ? 'women' : 'men'}/${viewedUserId}.jpg`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Random User {viewedUserId}</h3>
                      <p className="text-xs text-gray-500">Software Engineer at Company</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;