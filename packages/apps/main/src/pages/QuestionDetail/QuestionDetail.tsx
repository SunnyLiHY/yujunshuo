import React from 'react';
export interface User {
  id: string;
  name: string;
  avatar: string;
  ageGroup: string;
  title: string;
  company: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  ageGroup: string;
  author: User;
  answersCount: number;
  createdAt: string;
  tags: string[];
}
interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question }) => {
  return (
    <div className="card p-6 mb-8">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
        <span className={`age-badge age-badge-${question.ageGroup}`}>
          {question.ageGroup}岁
        </span>
      </div>
      
      <div className="prose max-w-none text-gray-600 mb-6"
        dangerouslySetInnerHTML={{ __html: question.content }}
      />
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span><i className="far fa-user mr-1"></i>{question.author.name}</span>
          <span><i className="far fa-clock mr-1"></i>{question.createdAt}</span>
          <span>
            <i className="far fa-comment mr-1"></i>
            {question.answersCount}个回答
          </span>
        </div>
        <div>
          {question.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;