import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionDetail, { Question } from './QuestionDetail';
import AnswerList, { Answer } from './AnswerList';
import AnswerForm from './AnswerForm';
import { sampleAnswers } from './mock';

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>(sampleAnswers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 这里应该从API获取数据
    // 示例数据
    setQuestion({
      id: '1',
      title: '大学期间如何规划自己的职业发展方向？',
      content: '我是一名大二学生，专业是计算机科学...',
      ageGroup: '20-25',
      author: {
        id: '1',
        name: '匿名用户',
        avatar: '',
        ageGroup: '20-25',
        title: '',
        company: ''
      },
      answersCount: 5,
      createdAt: '2小时前',
      tags: ['职业发展']
    });
    setIsLoading(false);
  }, [id]);

  const handleAnswerSubmit = (content: string, isAnonymous: boolean) => {
    // 处理提交回答
    console.log('提交回答:', { content, isAnonymous });
  };

  if (isLoading || !question) {
    return <div>加载中...</div>;
  }

  return (

    <main className="flex-grow py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuestionDetail question={question} />
        <AnswerList
          answers={answers}
          onSort={(sortBy) => console.log('排序方式:', sortBy)}
        />
        <AnswerForm
          questionAgeGroup={question.ageGroup}
          userAgeGroup="25-30"
          isLoggedIn={true}
          onSubmit={handleAnswerSubmit}
        />
      </div>
    </main>

  );
};

export default QuestionDetailPage;