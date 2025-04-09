import React, { useState } from 'react';
import { AgeRange } from './AgeBadges';
import { QuestionCard } from './QuestionCard';
import { sampleQuestions } from './mock';
import { Pagination } from 'antd';

export interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  ageRange: AgeRange;
  author: string;
  isAnonymous: boolean;
  createdAt: string;
  answersCount: number;
}

export type QuestionCategory = 'career' | 'education' | 'relationship' | 'life' | 'finance' | 'other';

interface QuestionListProps {
  questions: Question[];
}

const categories: QuestionCategory[] = [
  'career',
  'education',
  'relationship',
  'life',
  'finance',
  'other'
];

const categoryLabels: Record<QuestionCategory, string> = {
  career: '职业发展',
  education: '教育学习',
  relationship: '人际关系',
  life: '生活方式',
  finance: '财务规划',
  other: '其他'
};

export const QuestionList: React.FC<QuestionListProps> = () => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(14);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'unanswered'>('latest');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredQuestions = questions.filter(q => 
    selectedCategory === 'all' || q.category === selectedCategory
  );

  return (
    <div className="py-12 bg-white" id="browse-questions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">浏览问题</h2>
          <p className="mt-4 text-lg text-gray-500">探索他人的困惑，分享你的智慧</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={`${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCategory('all')}
            >
              全部
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
          <div>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="latest">最新发布</option>
              <option value="popular">热门问题</option>
              <option value="unanswered">等待回答</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* <Pagination /> */}
        <div className="mt-8 flex justify-center">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          showTotal={(total: number) => `共 ${total} 条`}
        />
      </div>
      </div>
    </div>
  );
};