import React from 'react';
import { Experience } from '../../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}
/**
 * 工作经历
 * @param experiences 工作经历列表 
 * @returns 
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">工作经历</h2>
      {experiences.map(exp => (
        <div key={exp.id} className="mb-4">
          <h3 className="font-medium">{exp.company}</h3>
          <p className="text-gray-600">{exp.position}</p>
          <p className="text-sm text-gray-500">{exp.period}</p>
          <p className="mt-2 text-gray-600">{exp.description}</p>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;