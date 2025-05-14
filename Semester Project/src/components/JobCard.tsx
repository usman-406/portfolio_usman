import React from 'react';
import { formatDate } from '../../utils/timeUtils';
import { Job } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start">
        <div className="w-12 h-12 mr-4 rounded overflow-hidden bg-gray-100 flex-shrink-0">
          <img 
            src={job.logo || 'https://via.placeholder.com/100?text=Logo'} 
            alt={`${job.company} logo`} 
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/100?text=Logo';
            }}
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
          <p className="text-gray-700">{job.company}</p>
          
          <div className="mt-2 flex flex-wrap gap-y-2">
            <div className="flex items-center text-gray-500 text-sm mr-4">
              <MapPin size={14} className="mr-1" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mr-4">
              <Briefcase size={14} className="mr-1" />
              <span>{job.type}</span>
            </div>
            
            {job.salary && (
              <div className="flex items-center text-gray-500 text-sm mr-4">
                <DollarSign size={14} className="mr-1" />
                <span>{job.salary}</span>
              </div>
            )}
            
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              <span>Posted {formatDate(job.postedAt)}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="default" size="sm">
                {req.split(' ').slice(0, 3).join(' ')}
                {req.split(' ').length > 3 ? '...' : ''}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge variant="default" size="sm">+{job.requirements.length - 3} more</Badge>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <Button variant="primary" size="sm">
              Apply Now
            </Button>
            <Button variant="outline" size="sm">
              Save
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;