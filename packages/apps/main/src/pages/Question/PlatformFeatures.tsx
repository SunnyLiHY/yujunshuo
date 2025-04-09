import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faCommentDots, faUserSecret } from '@fortawesome/free-solid-svg-icons';

interface Feature {
  icon: any;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: faQuestion,
    title: '年轻人提问',
    description: '年轻用户可以提出自己在人生、职业、学业等方面的困惑和问题，寻求更有经验者的建议。'
  },
  {
    icon: faCommentDots,
    title: '长者解答',
    description: '只有比提问者年长5岁以上的用户才能回答问题，确保回答来自于更丰富的人生经验。'
  },
  {
    icon: faUserSecret,
    title: '匿名选项',
    description: '用户可以选择匿名提问或回答，但年龄段信息仍会显示，保护隐私的同时确保交流的价值。'
  }
];

export const PlatformFeatures: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            平台规则
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            跨越年龄的智慧交流
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            我们相信，不同年龄段的人拥有不同的人生经验和智慧。在这里，问题只能由比提问者年长5岁以上的用户回答。
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};