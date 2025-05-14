import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchUser, fetchNotifications, fetchMessages } from './services/api';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import JobsPage from './pages/JobsPage';
import NetworkPage from './pages/NetworkPage';
import MessagingPage from './pages/MessagingPage';
import NotificationsPage from './pages/NotificationsPage';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // Load current user (using ID 1 for demo purposes)
        const user = await fetchUser(1);
        setCurrentUser(user);
        
        // Load notification count
        const notifications = await fetchNotifications(1);
        setUnreadNotifications(notifications.filter(n => !n.read).length);
        
        // Load message count
        const messages = await fetchMessages(1);
        setUnreadMessages(messages.filter(m => !m.read && m.senderId !== 1).length);
        
        setError(null);
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load application data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const handleNotificationsRead = () => {
    setUnreadNotifications(0);
  };

  const handleMessagesRead = () => {
    setUnreadMessages(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 mx-auto border-3 border-blue-600 border-t-transparent rounded-full"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading LinkedIn Clone</h2>
          <p className="mt-2 text-gray-500">Just a moment while we prepare your experience</p>
        </div>
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error || 'Failed to load user data'}</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              currentUser={currentUser} 
              unreadNotifications={unreadNotifications}
              unreadMessages={unreadMessages}
            />
          }
        >
          <Route index element={<HomePage currentUser={currentUser} />} />
          <Route path="profile/:id" element={<ProfilePage currentUser={currentUser} />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="network" element={<NetworkPage currentUser={currentUser} />} />
          <Route 
            path="messaging" 
            element={
              <MessagingPage 
                currentUser={currentUser}
              />
            } 
          />
          <Route 
            path="notifications" 
            element={
              <NotificationsPage 
                currentUser={currentUser}
                onNotificationsRead={handleNotificationsRead}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;