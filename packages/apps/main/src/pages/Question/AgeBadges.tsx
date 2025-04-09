import React from 'react';

export type AgeRange = '15-20' | '20-25' | '25-30' | '30-35' | '35-40' | '40-plus';
interface AgeBadgeProps {
  ageRange: AgeRange;
}
const ageBadgeStyles: Record<AgeRange, string> = {
  '15-20': 'bg-green-100 text-green-800',
  '20-25': 'bg-blue-100 text-blue-800',
  '25-30': 'bg-purple-100 text-purple-800',
  '30-35': 'bg-yellow-100 text-yellow-800',
  '35-40': 'bg-red-100 text-red-800',
  '40-plus': 'bg-gray-100 text-gray-800',
};

export const AgeBadge: React.FC<AgeBadgeProps> = ({ ageRange }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ageBadgeStyles[ageRange]}`}>
      {ageRange}岁
    </span>
  );
};