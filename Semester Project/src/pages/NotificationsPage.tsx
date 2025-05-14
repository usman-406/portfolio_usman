import React, { useState, useEffect } from 'react';
import { Notification } from '../types';
import { fetchNotifications } from '../services/api';
import NotificationCard from '../components/notifications/NotificationCard';
import { Bell } from 'lucide-react';

interface NotificationsPageProps {
  currentUser: { id: number };
  onNotificationsRead: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({
  currentUser,
  onNotificationsRead
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        const fetchedNotifications = await fetchNotifications(currentUser.id);
        setNotifications(fetchedNotifications);
        setError(null);
      } catch (err) {
        console.error('Error loading notifications:', err);
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadNotifications();
  }, [currentUser.id]);

  // Mark all notifications as read when the page is visited
  useEffect(() => {
    if (notifications.length > 0 && notifications.some(n => !n.read)) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      onNotificationsRead();
    }
  }, [notifications, onNotificationsRead]);

  const handleNotificationClick = (id: number) => {
    console.log('Notification clicked:', id);
    // In a real app, this would navigate to the relevant page
  };

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-red-700 text-center">
            {error}
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notifications yet</h3>
            <p className="text-gray-500 mt-2">
              When you have notifications, they'll appear here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;