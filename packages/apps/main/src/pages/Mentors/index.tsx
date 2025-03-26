import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterSection from './FilterSection';
import MentorList from './MentorList';
import { MentorFilter } from '../../types';

const MentorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MentorFilter>({
    industry: '',
    position: '',
    companyType: '',
    priceRange: ''
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: MentorFilter) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">寻找专业引导者</h1>
            <p className="mt-4 text-lg text-gray-600">
              从各行各业的职场精英中，找到最适合您的引导者
            </p>
          </div>
          
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <SearchBar onSearch={handleSearch} />
              <FilterSection 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
          </div>

          <MentorList 
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      </main>
    </div>
  );
};

export default MentorsPage;