import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <div className="mb-6">
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md"
          placeholder="搜索需求关键词..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center border border-gray-200 rounded px-4 text-sm font-medium text-indigo-600 hover:bg-gray-100"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;