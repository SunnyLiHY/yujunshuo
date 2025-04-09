import React, { useState } from 'react';

interface AnswerFormProps {
  questionAgeGroup: string;
  userAgeGroup?: string;
  isLoggedIn: boolean;
  onSubmit: (content: string, isAnonymous: boolean) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  questionAgeGroup,
  userAgeGroup,
  isLoggedIn,
  onSubmit
}) => {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const canAnswer = () => {
    if (!isLoggedIn || !userAgeGroup) return false;
    
    const userMinAge = parseInt(userAgeGroup.split('-')[0]);
    const questionMaxAge = parseInt(questionAgeGroup.split('-')[1]);
    
    return userMinAge > (questionMaxAge + 5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAnswer()) {
      onSubmit(content, isAnonymous);
      setContent('');
      setIsAnonymous(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="card p-6">
        <div className="text-center py-6">
          <p className="text-gray-600">登录后才能回答问题</p>
          <div className="mt-4">
            <a href="/login" className="btn-primary">立即登录</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">撰写回答</h2>
      
      {!canAnswer() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                根据平台规则，只有比提问者年长5岁以上的用户才能回答此问题。
                提问者年龄段：<span className="font-medium">{questionAgeGroup}岁</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="answer-content" 
            className="block text-sm font-medium text-gray-700"
          >
            您的回答
          </label>
          <textarea
            id="answer-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="分享您的经验和建议..."
          />
        </div>

        <div className="flex items-center">
          <input
            id="anonymous-answer"
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="anonymous-answer" 
            className="ml-2 block text-sm text-gray-900"
          >
            匿名回答（仍会显示年龄段）
          </label>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!canAnswer()}
          >
            提交回答
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnswerForm;