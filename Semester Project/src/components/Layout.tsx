import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { User } from '../../types';

interface LayoutProps {
  currentUser: User;
  unreadNotifications: number;
  unreadMessages: number;
}

const Layout: React.FC<LayoutProps> = ({ 
  currentUser,
  unreadNotifications,
  unreadMessages 
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        currentUser={currentUser}
        unreadNotifications={unreadNotifications}
        unreadMessages={unreadMessages}
      />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;