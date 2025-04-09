import React from 'react';
import { User } from './QuestionDetail';
import AnswerCard from './AnswerCard';

export interface Answer {
  id: string;
  content: string;
  author: User;
  isAccepted: boolean;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}


interface AnswerListProps {
  answers: Answer[];
  onSort: (sortBy: string) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, onSort }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {answers.length}个回答
      </h2>
      
      {/* <div className="flex justify-end mb-6">
        <select 
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="time">按时间排序</option>
          <option value="votes" selected>按投票排序</option>
        </select>
      </div> */}

      <div className="space-y-6">
        {answers.map(answer => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default AnswerList;