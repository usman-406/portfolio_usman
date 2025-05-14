import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Briefcase, 
  Bell, 
  MessageSquare, 
  Menu, 
  Search,
  X
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import { User } from '../../types';

interface NavbarProps {
  currentUser: User;
  unreadNotifications: number;
  unreadMessages: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentUser, 
  unreadNotifications, 
  unreadMessages 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would trigger a search
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-9 h-9 text-[#0A66C2]"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>

            {/* Search - hidden on mobile */}
            <div className="hidden md:ml-6 md:flex items-center">
              <div className="relative w-64">
                <form onSubmit={handleSearch}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-3 md:space-x-6">
            <Link 
              to="/" 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2]"
            >
              <Home size={22} />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/network" 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2]"
            >
              <Users size={22} />
              <span className="text-xs mt-1">My Network</span>
            </Link>
            <Link 
              to="/jobs" 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2]"
            >
              <Briefcase size={22} />
              <span className="text-xs mt-1">Jobs</span>
            </Link>
            <Link 
              to="/messaging" 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2] relative"
            >
              <MessageSquare size={22} />
              {unreadMessages > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadMessages > 9 ? '9+' : unreadMessages}
                </span>
              )}
              <span className="text-xs mt-1">Messaging</span>
            </Link>
            <Link 
              to="/notifications" 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2] relative"
            >
              <Bell size={22} />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
              <span className="text-xs mt-1">Notifications</span>
            </Link>
            <Link 
              to={`/profile/${currentUser.id}`} 
              className="inline-flex flex-col items-center justify-center px-1 text-gray-500 hover:text-[#0A66C2]"
            >
              <Avatar src={currentUser.avatar || ''} alt={currentUser.name} size="sm" />
              <span className="text-xs mt-1">Me</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile search */}
          <div className="px-3 py-2">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Mobile nav links */}
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={20} className="mr-3" />
            Home
          </Link>
          <Link
            to="/network"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={20} className="mr-3" />
            My Network
          </Link>
          <Link
            to="/jobs"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Briefcase size={20} className="mr-3" />
            Jobs
          </Link>
          <Link
            to="/messaging"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={20} className="mr-3" />
            Messaging
            {unreadMessages > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </Link>
          <Link
            to="/notifications"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Bell size={20} className="mr-3" />
            Notifications
            {unreadNotifications > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </Link>
          <Link
            to={`/profile/${currentUser.id}`}
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#0A66C2] hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Avatar src={currentUser.avatar || ''} alt={currentUser.name} size="sm" className="mr-3" />
            My Profile
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;