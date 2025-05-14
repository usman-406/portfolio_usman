import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PlusCircle, Edit } from 'lucide-react';
import { User } from '../../types';

interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface ProfileExperienceProps {
  user: User;
  isCurrentUser: boolean;
}

// Generate mock experience data based on user ID
const generateExperience = (userId: number): Experience[] => {
  const numExperiences = 1 + (userId % 3); // 1-3 experiences per user
  
  const experiences: Experience[] = [];
  for (let i = 0; i < numExperiences; i++) {
    const startYear = 2023 - (i * 2) - (userId % 2);
    const duration = 1 + (i % 2);
    
    experiences.push({
      id: i + 1,
      title: experienceTitles[((userId + i) * 3) % experienceTitles.length],
      company: companies[(userId + i) % companies.length],
      location: locations[(userId + i * 2) % locations.length],
      startDate: `${startYear}-01`,
      endDate: i === 0 ? undefined : `${startYear + duration}-01`,
      description: i === 0 ? descriptions[(userId + i) % descriptions.length] : undefined,
    });
  }
  
  return experiences;
};

const ProfileExperience: React.FC<ProfileExperienceProps> = ({ user, isCurrentUser }) => {
  const experiences = generateExperience(user.id);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  };
  
  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    
    const totalMonths = (yearDiff * 12) + monthDiff;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let duration = '';
    if (years > 0) {
      duration += `${years} yr${years !== 1 ? 's' : ''}`;
    }
    if (months > 0 || years === 0) {
      if (years > 0) duration += ' ';
      duration += `${months} mo${months !== 1 ? 's' : ''}`;
    }
    
    return duration;
  };
  
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
        {isCurrentUser && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            icon={<PlusCircle size={16} />}
          >
            Add
          </Button>
        )}
      </div>
      
      {experiences.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-3">No experience added yet</p>
          {isCurrentUser && (
            <Button
              variant="outline"
              className="mx-auto"
              icon={<PlusCircle size={16} />}
            >
              Add Experience
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative">
              {isCurrentUser && (
                <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                  <Edit size={16} />
                </button>
              )}
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    {exp.company.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    {' · '}
                    {calculateDuration(exp.startDate, exp.endDate)}
                  </p>
                  {exp.location && (
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  )}
                  
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// Mock data for experience
const experienceTitles = [
  "Software Engineer",
  "Senior Developer",
  "Product Manager",
  "UI/UX Designer",
  "Marketing Specialist",
  "Data Scientist",
  "Project Manager",
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Developer"
];

const companies = [
  "Google",
  "Microsoft",
  "Apple",
  "Amazon",
  "Meta",
  "Netflix",
  "Tesla",
  "Spotify",
  "Uber",
  "Airbnb"
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

const descriptions = [
  "Led development of core features that increased user engagement by 25%. Collaborated with cross-functional teams to deliver high-quality software solutions on time.",
  "Designed and implemented scalable architectures supporting millions of users. Mentored junior developers and improved team coding standards.",
  "Managed agile development process and facilitated sprint planning. Reduced bug count by 40% through improved testing methodologies.",
  "Created responsive user interfaces with React and TypeScript. Improved application performance by 35% through code optimization."
];

export default ProfileExperience;