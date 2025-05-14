import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { fetchJobs } from '../services/api';
import JobCard from '../components/jobs/JobCard';
import JobSearch from '../components/jobs/JobSearch';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
        setError(null);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  const handleSearch = (search: string, location: string, jobType: string) => {
    let results = [...jobs];
    
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(
        job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (location) {
      const locationLower = location.toLowerCase();
      results = results.filter(
        job => job.location.toLowerCase().includes(locationLower)
      );
    }
    
    if (jobType) {
      results = results.filter(
        job => job.type === jobType
      );
    }
    
    setFilteredJobs(results);
  };

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Find your next role</h1>
      <p className="text-gray-600 mb-6">
        Discover job opportunities matching your skills and career goals
      </p>
      
      <JobSearch onSearch={handleSearch} />
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-600">Loading jobs...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
          {error}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="text-gray-600 mt-2">
            Try adjusting your search filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;