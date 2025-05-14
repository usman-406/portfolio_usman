import React, { useState, useEffect } from 'react';
import { Message, User } from '../types';
import { fetchMessages, fetchUsers } from '../services/api';
import MessageCard from '../components/messaging/MessageCard';
import MessageThread from '../components/messaging/MessageThread';
import { Search, Edit, X } from 'lucide-react';

interface MessagingPageProps {
  currentUser: User;
}

const MessagingPage: React.FC<MessagingPageProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeThread, setActiveThread] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMessaging = async () => {
      try {
        setLoading(true);
        const [fetchedMessages, fetchedUsers] = await Promise.all([
          fetchMessages(currentUser.id),
          fetchUsers()
        ]);
        
        setMessages(fetchedMessages);
        setUsers(fetchedUsers.filter(user => user.id !== currentUser.id));
        setError(null);
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadMessaging();
  }, [currentUser.id]);

  const handleThreadClick = (senderId: number) => {
    setActiveThread(senderId);
    
    // Mark messages as read
    setMessages(messages.map(msg => 
      msg.senderId === senderId ? { ...msg, read: true } : msg
    ));
  };

  // Filter and group messages by sender
  const getFilteredThreads = () => {
    const senderIds = new Set<number>();
    
    // Filter messages by search query if needed
    const filteredMessages = searchQuery
      ? messages.filter(msg => {
          const sender = users.find(u => u.id === msg.senderId);
          return sender?.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : messages;
    
    // Get unique senders
    filteredMessages.forEach(msg => {
      if (msg.senderId !== currentUser.id) {
        senderIds.add(msg.senderId);
      } else {
        senderIds.add(msg.receiverId);
      }
    });
    
    return Array.from(senderIds);
  };

  const getThreadPreview = (userId: number) => {
    const threadMessages = messages.filter(
      msg => msg.senderId === userId || msg.receiverId === userId
    );
    
    return threadMessages.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  };

  const getThreadMessages = (userId: number) => {
    return messages
      .filter(msg => msg.senderId === userId || msg.receiverId === userId)
      .sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
  };

  const getUnreadCount = (userId: number) => {
    return messages.filter(
      msg => msg.senderId === userId && !msg.read
    ).length;
  };

  const threads = getFilteredThreads();

  return (
    <div className="pt-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-140px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Messages list */}
          <div className="border-r border-gray-200">
            <div className="p-3 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-gray-900">Messaging</h2>
                <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Edit size={18} />
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Search messages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-81px)]">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <p className="mt-2 text-gray-600 text-sm">Loading messages...</p>
                </div>
              ) : error ? (
                <div className="p-4 text-red-700 text-center text-sm">
                  {error}
                </div>
              ) : threads.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No messages found</p>
                </div>
              ) : (
                threads.map(userId => {
                  const user = users.find(u => u.id === userId);
                  const preview = getThreadPreview(userId);
                  if (!user || !preview) return null;
                  
                  const unreadCount = getUnreadCount(userId);
                  
                  return (
                    <MessageCard
                      key={userId}
                      message={preview}
                      sender={user}
                      isCurrentUser={preview.senderId === currentUser.id}
                      onClick={() => handleThreadClick(userId)}
                    />
                  );
                })
              )}
            </div>
          </div>
          
          {/* Message thread */}
          <div className="col-span-2 h-full flex flex-col">
            {activeThread ? (
              <MessageThread
                messages={getThreadMessages(activeThread)}
                currentUser={currentUser}
                otherUser={users.find(u => u.id === activeThread) || users[0]}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Your Messages</h3>
                  <p className="text-gray-500 mt-1">
                    Select a conversation to view messages
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;