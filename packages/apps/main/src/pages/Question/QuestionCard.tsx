import React from 'react';
import { Link } from 'react-router-dom';

import { Question } from './QuestionList';
import { AgeBadge, AgeRange } from './AgeBadges';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="question-card">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
        </h3>
        <AgeBadge ageRange={question.ageRange as AgeRange} />
      </div>
      <p className="mt-2 text-gray-600 line-clamp-2">{question.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>
            <i className="far fa-user mr-1"></i>
            {question.isAnonymous ? '匿名用户' : question.author}
          </span>
          <span>
            <i className="far fa-clock mr-1"></i>
            {question.createdAt}
          </span>
          <span>
            <i className="far fa-comment mr-1"></i>
            {question.answersCount}个回答
          </span>
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {question.category}
          </span>
        </div>
      </div>
    </div>
  );
};