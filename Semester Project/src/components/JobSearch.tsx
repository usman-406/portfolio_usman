import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import Button from '../ui/Button';

interface JobSearchProps {
  onSearch: (search: string, location: string, type: string) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search, location, jobType);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Job title, keywords, or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="lg:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              className="lg:hidden"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              <Filter size={18} />
              <span className="ml-1">Filters</span>
            </Button>
            <Button type="submit" className="flex-shrink-0">
              Search
            </Button>
          </div>
        </div>

        {/* Additional filters - hidden on mobile unless expanded */}
        <div className={`${filtersVisible ? 'block' : 'hidden lg:block'} mt-3 lg:mt-4`}>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Briefcase size={16} className="text-gray-500" />
              <select
                className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">Remote</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">Easy Apply</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;