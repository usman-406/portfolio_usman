import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { fetchUsers } from '../services/api';
import ConnectionCard from '../components/connections/ConnectionCard';

interface NetworkPageProps {
  currentUser: User;
}

const NetworkPage: React.FC<NetworkPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<Record<number, 'connected' | 'pending' | 'none'>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'connections' | 'invitations' | 'suggestions'>('connections');

  useEffect(() => {
    const loadNetwork = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers();
        
        // Filter out current user
        const networkUsers = fetchedUsers.filter(user => user.id !== currentUser.id);
        
        setUsers(networkUsers);
        
        // Generate initial connection statuses
        const statuses: Record<number, 'connected' | 'pending' | 'none'> = {};
        networkUsers.forEach(user => {
          // Even IDs are connected, odd IDs are either pending or none
          if (user.id % 2 === 0) {
            statuses[user.id] = 'connected';
          } else {
            statuses[user.id] = user.id % 5 === 1 ? 'pending' : 'none';
          }
        });
        
        setConnectionStatus(statuses);
        setError(null);
      } catch (err) {
        console.error('Error loading network:', err);
        setError('Failed to load network. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadNetwork();
  }, [currentUser.id]);

  const handleConnect = (userId: number) => {
    setConnectionStatus(prev => ({
      ...prev,
      [userId]: prev[userId] === 'none' ? 'pending' : 'none'
    }));
  };

  const handleMessage = (userId: number) => {
    console.log('Open message thread with user ID:', userId);
    // In a real app, this would navigate to the messaging page
  };

  // Filter users based on active tab
  const getFilteredUsers = () => {
    if (activeTab === 'connections') {
      return users.filter(user => connectionStatus[user.id] === 'connected');
    } else if (activeTab === 'invitations') {
      return users.filter(user => connectionStatus[user.id] === 'pending');
    } else {
      return users.filter(user => connectionStatus[user.id] === 'none');
    }
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Network</h1>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6 border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                activeTab === 'connections'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('connections')}
            >
              Connections
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                activeTab === 'invitations'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('invitations')}
            >
              Invitations
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                activeTab === 'suggestions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('suggestions')}
            >
              People You May Know
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading network...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 text-red-700 text-center">
            {error}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">No {activeTab} found</h3>
            <p className="text-gray-600 mt-2">
              {activeTab === 'connections'
                ? "You don't have any connections yet. Try connecting with people you know."
                : activeTab === 'invitations'
                ? "You don't have any pending invitations."
                : "We don't have any connection suggestions for you at the moment."}
            </p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map(user => (
              <ConnectionCard
                key={user.id}
                user={user}
                isConnected={connectionStatus[user.id] === 'connected'}
                isPending={connectionStatus[user.id] === 'pending'}
                onConnect={() => handleConnect(user.id)}
                onMessage={() => handleMessage(user.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkPage;