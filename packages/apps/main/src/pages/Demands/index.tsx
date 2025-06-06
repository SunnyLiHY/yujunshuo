import React, { useState } from 'react';
import { FilterOptions, FilterTag, NewDemand } from '../../types';
import { PublishDemandModal } from './PublishDemandModal';
import { message } from 'antd';
import SearchBar from './SearchBar';
import FilterSection from './SearchFilter';
import { DemandList } from './DemandList';

const DemandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    position: '',
    status: '',
    budget: ''
  });
  const [filterTags, setFilterTags] = useState<FilterTag[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handlePublishDemand = async (newDemand: NewDemand) => {
    setConfirmLoading(true);
    try {
      // 这里添加发布需求的API调用
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用
      message.success('需求发布成功！');
      setIsModalOpen(false);
    } catch (error) {
      message.error('发布失败，请重试！');
    } finally {
      setConfirmLoading(false);
    }
  };

   const handleFilterChange = (newFilters: FilterOptions) => {
      setFilters(newFilters);
    };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">浏览需求</h1>
              <p className="mt-2 text-lg text-gray-600">查看求学者发布的职业规划咨询需求</p>
            </div>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>发布需求</button>
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

          <DemandList 
            searchQuery={searchQuery}
            filterOptions={filters}
            filterTags={filterTags}
          />
        </div>
      </main>
      <PublishDemandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePublishDemand}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

export default DemandsPage;