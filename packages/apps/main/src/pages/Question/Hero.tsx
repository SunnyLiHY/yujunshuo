import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-indigo-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="人生疑问"
        />
        <div className="absolute inset-0 bg-indigo-800 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 md:py-32 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          人生疑问，长者解答
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-indigo-100 max-w-3xl">
          在这里，年轻人提出问题，由更年长的用户解答。跨越年龄的智慧传递，让经验为你指引方向。
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <ScrollLink
            to="ask-question"
            smooth={true}
            duration={500}
            offset={-100}
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 text-center cursor-pointer"
          >
            提出问题
          </ScrollLink>
          <ScrollLink
            to="browse-questions"
            smooth={true}
            duration={500}
            offset={-100}
            className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-6 sm:px-8 rounded text-base sm:text-lg text-center cursor-pointer"
          >
            浏览问题
          </ScrollLink>
        </div>
      </div>
    </div>
  );
};