import React from 'react';
import { Answer } from './AnswerList';

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  return (
    <div className={`answer-card ${answer.isAccepted ? 'answer-card-accepted' : 'answer-card-normal'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img 
            className="h-10 w-10 rounded-full mr-3" 
            src={answer.author.avatar} 
            alt={`${answer.author.name}的头像`} 
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {answer.author.name}
            </h3>
            <span className={`age-badge age-badge-${answer.author.ageGroup}`}>
              {answer.author.ageGroup}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {answer.author.title} · {answer.author.company}
            </span>
          </div>
        </div>
        
        {answer.isAccepted && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <i className="fas fa-check mr-1"></i>已采纳
            </span>
          </div>
        )}
      </div>
      
      <div className="prose max-w-none text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: answer.content }}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        </div>
        <span className="text-sm text-gray-500">{answer.createdAt}</span>
      </div>
    </div>
  );
};

export default AnswerCard;