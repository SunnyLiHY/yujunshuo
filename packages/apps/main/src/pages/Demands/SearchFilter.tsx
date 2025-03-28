import React from 'react';
import { FilterOptions } from '../../types';

interface FilterSectionProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      position: '',
      status: '',
      budget: '',
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 行业筛选 */}
        <div>
          <label className="form-label text-gray-700">职位方向</label>
          <select
            className="form-input"
            value={filters.position}
            onChange={(e) => handleFilterChange('position', e.target.value)}
          >
            <option value="">全部职位</option>
            <option value="developer">开发工程师</option>
            <option value="product">产品经理</option>
            <option value="design">设计师</option>
            <option value="marketing">市场营销</option>
            <option value="operation">运营</option>
            <option value="hr">人力资源</option>
            <option value="finance">财务</option>
            <option value="management">管理层</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div>
          <label className="form-label text-gray-700">公司类型</label>
          <select
            className="form-input"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">全部公司</option>
            <option value="bat">BAT</option>
            <option value="unicorn">独角兽</option>
            <option value="foreign">外企</option>
            <option value="state">国企</option>
            <option value="startup">创业公司</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div>
          <label className="form-label text-gray-700">公司类型</label>
          <select
            className="form-input"
            value={filters.budget}
            onChange={(e) => handleFilterChange('budget', e.target.value)}
          >
            <option value="">全部价格</option>
            <option value="0-100">0-100元/小时</option>
            <option value="100-200">100-200元/小时</option>
            <option value="200-300">200-300元/小时</option>
            <option value="300+">300元以上/小时</option>
          </select>
        </div>
      </div>

      {/* 已选筛选条件 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.position && (
          <span className="filter-badge">
            {filters.position}
            <button onClick={() => handleFilterChange('position', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {filters.status && (
          <span className="filter-badge">
            {filters.status}
            <button onClick={() => handleFilterChange('status', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {filters.budget && (
          <span className="filter-badge">
            {filters.budget}
            <button onClick={() => handleFilterChange('budget', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {/* 其他已选条件... */}
        <button className="text-sm text-indigo-600 hover:text-indigo-800" onClick={clearFilters}>
          清除全部
        </button>
      </div>
    </>
  );
};

export default FilterSection;
