import React, { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { fetchPosts, fetchUsers } from '../services/api';
import NewPostForm from '../components/feed/NewPostForm';
import PostCard from '../components/feed/PostCard';

const HomePage: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [fetchedPosts, fetchedUsers] = await Promise.all([
          fetchPosts(),
          fetchUsers()
        ]);
        
        // Enrich posts with author information
        const enrichedPosts = fetchedPosts.map(post => ({
          ...post,
          author: fetchedUsers.find(user => user.id === post.userId)
        }));
        
        setPosts(enrichedPosts);
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load feed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-6">
      {/* Left sidebar */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="-mt-8 px-4 pb-4 text-center">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold mt-2 text-gray-900">{currentUser.name}</h3>
            <p className="text-sm text-gray-500">{currentUser.headline}</p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-2">
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Profile viewers</span>
              <span className="text-blue-600 font-medium">32</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Post impressions</span>
              <span className="text-blue-600 font-medium">142</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <h4 className="font-semibold text-sm text-gray-500 mb-3">Recent</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-700 hover:bg-gray-50 cursor-pointer p-1 rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-200 flex items-center justify-center mr-2">#</span>
                <span>reactjs</span>
              </li>
              <li className="flex items-center text-sm text-gray-700 hover:bg-gray-50 cursor-pointer p-1 rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-200 flex items-center justify-center mr-2">#</span>
                <span>typescript</span>
              </li>
              <li className="flex items-center text-sm text-gray-700 hover:bg-gray-50 cursor-pointer p-1 rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-200 flex items-center justify-center mr-2">#</span>
                <span>webdevelopment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Main feed */}
      <div className="lg:col-span-2">
        <NewPostForm currentUser={currentUser} />
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading feed...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
            {error}
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              author={post.author || users.find(user => user.id === post.userId) || currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;