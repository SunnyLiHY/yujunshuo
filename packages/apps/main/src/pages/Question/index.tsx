import React from 'react';
import { Hero } from './Hero';
import { PlatformFeatures } from './PlatformFeatures';
import { QuestionList } from './QuestionList';
import QuestionForm from './QuestionForm';

const LifeQuestions: React.FC = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <PlatformFeatures />
      <QuestionForm onSubmit={(data: any) => {
        console.log('Function not implemented.');
      }} />
      <QuestionList />
    </main>
  );
};

export default LifeQuestions;