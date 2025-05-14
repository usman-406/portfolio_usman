import React, { useState } from 'react';
import { formatRelativeTime } from '../../utils/timeUtils';
import { Message, User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Send, Phone, Video } from 'lucide-react';

interface MessageThreadProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUser,
  otherUser,
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      // In a real app, this would send the message to an API
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar
            src={otherUser.avatar || ''}
            alt={otherUser.name}
            size="md"
            className="mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
            <p className="text-xs text-gray-500">{otherUser.headline}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Phone size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Video size={18} />
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isFromCurrentUser = message.senderId === currentUser.id;
          return (
            <div key={message.id} className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}>
              {!isFromCurrentUser && (
                <Avatar
                  src={otherUser.avatar || ''}
                  alt={otherUser.name}
                  size="sm"
                  className="mr-2 mt-1"
                />
              )}
              
              <div className={`max-w-[70%] ${isFromCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'} p-3 rounded-lg`}>
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${isFromCurrentUser ? 'text-blue-200' : 'text-gray-500'}`}>
                  {formatRelativeTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Message input */}
      <div className="border-t p-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 border rounded-full overflow-hidden bg-gray-100 flex items-center pl-4 pr-2">
            <input
              type="text"
              className="flex-1 bg-transparent py-2 focus:outline-none"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm"
              className="rounded-full p-2"
              disabled={!newMessage.trim()}
            >
              <Send size={18} className="text-blue-600" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageThread;