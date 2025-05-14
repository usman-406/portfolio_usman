import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { PlusCircle, Edit } from 'lucide-react';
import { User } from '../../types';

interface Skill {
  id: number;
  name: string;
  endorsements: number;
}

interface ProfileSkillsProps {
  user: User;
  isCurrentUser: boolean;
}

// Generate mock skills based on user ID
const generateSkills = (userId: number): Skill[] => {
  const baseSkills = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "HTML/CSS",
    "SQL",
    "Python",
    "AWS",
    "UI/UX Design",
    "REST APIs",
    "GraphQL",
    "Git",
    "Agile Methodologies",
    "Leadership",
    "Communication"
  ];
  
  // Select 5-8 skills for each user
  const numSkills = 5 + (userId % 4);
  const offset = userId % 5;
  
  return Array.from({ length: numSkills }, (_, i) => ({
    id: i + 1,
    name: baseSkills[(offset + i) % baseSkills.length],
    endorsements: Math.floor(Math.random() * 50) + (userId % 20),
  }));
};

const ProfileSkills: React.FC<ProfileSkillsProps> = ({ user, isCurrentUser }) => {
  const skills = generateSkills(user.id);
  
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
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
      
      {skills.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-3">No skills added yet</p>
          {isCurrentUser && (
            <Button
              variant="outline"
              className="mx-auto"
              icon={<PlusCircle size={16} />}
            >
              Add Skills
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="relative">
              {isCurrentUser && (
                <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                  <Edit size={16} />
                </button>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{skill.name}</h3>
                  {skill.endorsements > 0 && (
                    <p className="text-sm text-gray-500">
                      {skill.endorsements} endorsement{skill.endorsements !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                {!isCurrentUser && (
                  <Button variant="outline" size="sm">
                    Endorse
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ProfileSkills;