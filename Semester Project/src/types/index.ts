// Type definitions for the application

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  avatar?: string;
  coverImage?: string;
  headline?: string;
  location?: string;
  connections?: number;
  about?: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  likes?: number;
  comments?: number;
  shares?: number;
  timestamp?: string;
  author?: User;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary?: string;
  postedAt: string;
  logo?: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'connection' | 'like' | 'comment' | 'job' | 'message';
  content: string;
  timestamp: string;
  read: boolean;
}