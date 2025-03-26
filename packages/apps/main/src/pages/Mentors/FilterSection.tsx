import React from 'react';
import { MentorFilter } from '../../types';

interface FilterSectionProps {
  filters: MentorFilter;
  onFilterChange: (filters: MentorFilter) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof MentorFilter, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      industry: '',
      position: '',
      companyType: '',
      priceRange: '',
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 行业筛选 */}
        <div>
          <label className="form-label text-gray-700">行业</label>
          <select
            className="form-input"
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            <option value="">全部行业</option>
            <option value="it">IT/互联网</option>
            <option value="finance">金融/财会</option>
            <option value="education">教育/培训</option>
            <option value="medical">医疗/健康</option>
            <option value="marketing">市场/营销</option>
            <option value="design">设计/创意</option>
            <option value="law">法律/咨询</option>
            <option value="other">其他</option>
            {/* 其他选项... */}
          </select>
        </div>
        <div>
          <label className="form-label">职位</label>
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
          <label className="form-label">公司类型</label>
          <select
            className="form-input"
            value={filters.companyType}
            onChange={(e) => handleFilterChange('companyType', e.target.value)}
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
          <label className="form-label">价格区间</label>
          <select
            className="form-input"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
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
        {filters.industry && (
          <span className="filter-badge">
            {filters.industry}
            <button onClick={() => handleFilterChange('industry', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {filters.position && (
          <span className="filter-badge">
            {filters.position}
            <button onClick={() => handleFilterChange('industry', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {filters.companyType && (
          <span className="filter-badge">
            {filters.companyType}
            <button onClick={() => handleFilterChange('industry', '')}>
              <i className="fas fa-times" />
            </button>
          </span>
        )}
        {filters.priceRange && (
          <span className="filter-badge">
            {filters.priceRange}
            <button onClick={() => handleFilterChange('industry', '')}>
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
