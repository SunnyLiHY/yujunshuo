import React from 'react';
import { Mentor, MentorFilter } from '../../types';
import MentorCard from './MentorCard';

interface MentorListProps {
  searchQuery: string;
  filters: MentorFilter;
}

const MentorList: React.FC<MentorListProps> = ({ searchQuery, filters }) => {
  // 这里可以添加获取导师数据的逻辑
  const mentors: Mentor[] = [
    {
      id: 1,
      name: "张明",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      company: "腾讯",
      position: "产品经理",
      rating: 4.5,
      description: "5年产品经验，擅长用户增长和产品规划，曾负责多个千万级用户产品",
      skills: ["产品规划", "用户增长", "数据分析"],
      price: 200
    },
    // 其他导师数据...
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map(mentor => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default MentorList;