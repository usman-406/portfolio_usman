import { Post, User, Job, Comment, Message, Notification } from '../types';

// Base API URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// Fetch posts for the feed
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts = await response.json();
  
  // Enrich posts with dummy data since the API doesn't provide all we need
  return posts.map((post: Post) => ({
    ...post,
    likes: Math.floor(Math.random() * 100) + 1,
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }));
};

// Fetch a single post
export const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  const post = await response.json();
  return {
    ...post,
    likes: Math.floor(Math.random() * 100) + 1,
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  };
};

// Fetch users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const users = await response.json();
  
  // Add additional LinkedIn-specific user data
  return users.map((user: User) => ({
    ...user,
    avatar: `https://randomuser.me/api/portraits/${user.id % 2 === 0 ? 'women' : 'men'}/${user.id}.jpg`,
    coverImage: `https://picsum.photos/id/${100 + user.id}/800/200`,
    headline: getRandomHeadline(),
    location: getRandomLocation(),
    connections: Math.floor(Math.random() * 500) + 50,
    about: "Professional with a passion for innovation and growth. Experienced in driving business results through strategic initiatives and collaborative leadership.",
  }));
};

// Fetch a single user
export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  const user = await response.json();
  return {
    ...user,
    avatar: `https://randomuser.me/api/portraits/${user.id % 2 === 0 ? 'women' : 'men'}/${user.id}.jpg`,
    coverImage: `https://picsum.photos/id/${100 + user.id}/800/200`,
    headline: getRandomHeadline(),
    location: getRandomLocation(),
    connections: Math.floor(Math.random() * 500) + 50,
    about: "Professional with a passion for innovation and growth. Experienced in driving business results through strategic initiatives and collaborative leadership.",
  };
};

// Fetch post comments
export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
};

// Fetch jobs (mock data since JSONPlaceholder doesn't have jobs)
export const fetchJobs = async (): Promise<Job[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock job data
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: jobTitles[i % jobTitles.length],
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    type: jobTypes[i % jobTypes.length],
    description: "We are looking for a talented professional to join our growing team. In this role, you'll have the opportunity to work on challenging projects and collaborate with cross-functional teams to deliver exceptional results.",
    requirements: [
      "Bachelor's degree in a relevant field",
      `${3 + i % 3} years of experience in a similar role`,
      "Strong communication and problem-solving skills",
      "Ability to work in a fast-paced environment"
    ],
    salary: salaryRanges[i % salaryRanges.length],
    postedAt: new Date(Date.now() - (i * 86400000)).toISOString(),
    logo: `https://logo.clearbit.com/${companies[i % companies.length].toLowerCase().replace(' ', '')}.com`
  }));
};

// Fetch messages (mock data)
export const fetchMessages = async (userId: number): Promise<Message[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate 10 mock messages
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    senderId: i % 2 === 0 ? userId : userId + 1,
    receiverId: i % 2 === 0 ? userId + 1 : userId,
    content: messageContents[i % messageContents.length],
    timestamp: new Date(Date.now() - (i * 3600000)).toISOString(),
    read: i > 3,
  }));
};

// Fetch notifications (mock data)
export const fetchNotifications = async (userId: number): Promise<Notification[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate 10 mock notifications
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    userId,
    type: notificationTypes[i % notificationTypes.length] as 'connection' | 'like' | 'comment' | 'job' | 'message',
    content: notificationContents[i % notificationContents.length],
    timestamp: new Date(Date.now() - (i * 7200000)).toISOString(),
    read: i > 2,
  }));
};

// Helper functions and mock data for generating realistic looking content

const jobTitles = [
  "Software Engineer", 
  "Product Manager", 
  "UX Designer", 
  "Data Scientist", 
  "Marketing Specialist",
  "Sales Representative", 
  "Project Manager", 
  "Financial Analyst"
];

const companies = [
  "Google", 
  "Microsoft", 
  "Amazon", 
  "Apple", 
  "Facebook",
  "Netflix", 
  "Tesla", 
  "Uber"
];

const locations = [
  "San Francisco, CA", 
  "New York, NY", 
  "Seattle, WA", 
  "Austin, TX", 
  "Boston, MA",
  "Chicago, IL", 
  "Los Angeles, CA", 
  "Remote"
];

const jobTypes = [
  "Full-time", 
  "Part-time", 
  "Contract", 
  "Freelance", 
  "Internship"
];

const salaryRanges = [
  "$80,000 - $100,000", 
  "$100,000 - $120,000", 
  "$120,000 - $150,000", 
  "$150,000 - $180,000", 
  "Competitive"
];

const messageContents = [
  "Hi there! I saw your profile and would love to connect.",
  "Thanks for the introduction yesterday. Looking forward to our meeting next week.",
  "I'm reaching out about a potential opportunity at my company that might interest you.",
  "Just wanted to follow up on our conversation from last week.",
  "Congratulations on your new role! How are you liking it so far?",
  "Have you had a chance to review the document I sent over?",
  "I'd love to get your thoughts on the industry trends we discussed.",
  "Are you attending the conference next month?",
  "I noticed we have several mutual connections. Would you be open to a quick call?",
  "Just came across an article that reminded me of our discussion."
];

const notificationTypes = [
  "connection", 
  "like", 
  "comment", 
  "job", 
  "message"
];

const notificationContents = [
  "John Smith has accepted your connection request",
  "Sarah Johnson liked your post about career transitions",
  "David Williams commented on your article",
  "A new job matching your skills has been posted",
  "You have a new message from Michael Brown",
  "Your post has reached 100 views",
  "Emma Davis endorsed you for Project Management",
  "Your profile appeared in 25 searches this week",
  "Daniel Wilson shared your post",
  "New jobs in your area are available"
];

function getRandomHeadline(): string {
  const headlines = [
    "Software Engineer at Tech Innovations Inc.",
    "Marketing Director | Brand Strategist | Growth Hacker",
    "Product Manager with 10+ years of experience in SaaS",
    "UX/UI Designer passionate about creating intuitive user experiences",
    "Data Scientist | AI Researcher | Machine Learning Expert",
    "Senior Project Manager at Global Solutions",
    "Financial Analyst specializing in Investment Strategies",
    "HR Director focused on building inclusive work environments"
  ];
  
  return headlines[Math.floor(Math.random() * headlines.length)];
}

function getRandomLocation(): string {
  const cities = [
    "San Francisco Bay Area",
    "Greater New York City Area",
    "Seattle, Washington",
    "Austin, Texas",
    "Boston, Massachusetts",
    "Los Angeles, California",
    "Chicago, Illinois",
    "Denver, Colorado",
    "London, United Kingdom",
    "Toronto, Canada"
  ];
  
  return cities[Math.floor(Math.random() * cities.length)];
}