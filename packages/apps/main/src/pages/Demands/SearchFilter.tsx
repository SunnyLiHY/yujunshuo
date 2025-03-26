import React from 'react';
import { FilterOptions, FilterTag } from '../../types';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  filterTags: FilterTag[];
  onRemoveTag: (tagId: string) => void;
  onClearAllTags: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  filterOptions,
  onFilterChange,
  filterTags,
  onRemoveTag,
  onClearAllTags
}) => {
  return (
    <div className="mb-8">
      <div className="card p-6">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10"
              placeholder="搜索需求关键词..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 筛选条件 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 职位筛选 */}
          <div>
            <label className="form-label">职位方向</label>
            <select 
              className="form-input"
              value={filterOptions.position}
              onChange={(e) => onFilterChange({...filterOptions, position: e.target.value})}
            >
              <option value="">全部职位</option>
              <option value="developer">开发工程师</option>
              <option value="product">产品经理</option>
              {/* 其他选项... */}
            </select>
          </div>

          {/* 状态和预算筛选... */}
        </div>

        {/* 已选筛选条件 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filterTags.map(tag => (
            <span key={tag.id} className="filter-badge">
              {tag.text}
              <button onClick={() => onRemoveTag(tag.id)}>
                <i className="fas fa-times" />
              </button>
            </span>
          ))}
          {filterTags.length > 0 && (
            <button 
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={onClearAllTags}
            >
              清除全部
            </button>
          )}
        </div>
      </div>
    </div>
  );
};