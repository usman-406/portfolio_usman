import React, { useState } from 'react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Image, FileText, Video } from 'lucide-react';
import { User } from '../../types';

interface NewPostFormProps {
  currentUser: User;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ currentUser }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the post to an API
    console.log('Creating new post:', postText);
    setPostText('');
  };

  return (
    <Card className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <Avatar 
            src={currentUser.avatar || ''} 
            alt={currentUser.name} 
          />
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="What do you want to talk about?"
              rows={3}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2">
          <div className="flex space-x-2">
            <button 
              type="button"
              className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors"
            >
              <Image size={20} className="text-blue-600" />
              <span className="ml-1 text-sm hidden sm:inline">Photo</span>
            </button>
            <button 
              type="button"
              className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors"
            >
              <Video size={20} className="text-green-600" />
              <span className="ml-1 text-sm hidden sm:inline">Video</span>
            </button>
            <button 
              type="button"
              className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors"
            >
              <FileText size={20} className="text-orange-600" />
              <span className="ml-1 text-sm hidden sm:inline">Document</span>
            </button>
          </div>

          <Button 
            type="submit" 
            disabled={!postText.trim()}
            size="sm"
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default NewPostForm;