import React from 'react';
import { DemandCard } from './DemandCard';
import { Demand, FilterOptions, FilterTag } from '../../types';

interface DemandListProps {
  searchQuery: string;
  filterOptions: FilterOptions;
  filterTags: FilterTag[];
}

export const DemandList: React.FC<DemandListProps> = ({
  searchQuery,
  filterOptions,
  filterTags
}) => {
  // 这里可以添加获取需求列表的逻辑
  const demands: Demand[] = demandsData; // 示例数据

  return (
    <div className="space-y-6">
      {demands.map(demand => (
        <DemandCard key={demand.id} demand={demand} />
      ))}
    </div>
  );
};

const demandsData: Demand[] = [
  {
    id: "1",
    title: "寻找产品经理指导职业规划和简历优化",
    status: "open",
    description: "大四学生，计算机专业，对产品经理岗位感兴趣，希望得到行业内人士的指导，包括职业规划、简历优化和面试技巧等。",
    tags: ["IT/互联网", "产品经理", "职业规划", "简历优化"],
    priceRange: "¥150-200/小时",
    estimatedHours: "预计1-2小时",
    publishDate: "2023-06-15",
    user: {
      name: "陈小雨",
      school: "北京大学",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    }
  },
  {
    id: "2",
    title: "金融行业求职咨询，希望了解投行和券商工作内容",
    status: "progress",
    description: "金融专业研究生，希望了解投行和券商的工作内容、职业发展路径和入行要求，为即将到来的秋招做准备。",
    tags: ["金融", "投资银行", "证券", "职业规划"],
    priceRange: "¥200-300/小时",
    estimatedHours: "预计2-3小时",
    publishDate: "2023-06-14",
    user: {
      name: "李明",
      school: "清华大学",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: "3",
    title: "前端开发工程师转型AI工程师咨询",
    status: "open",
    description: "目前是前端开发工程师，想转型AI方向，需要了解技能要求和学习路径，希望能得到相关从业者的建议。",
    tags: ["IT/互联网", "人工智能", "职业转型", "技能提升"],
    priceRange: "¥180-250/小时",
    estimatedHours: "预计1.5小时",
    publishDate: "2023-06-13",
    user: {
      name: "张伟",
      school: "浙江大学",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: "4",
    title: "设计师求职作品集优化建议",
    status: "closed",
    description: "应届生，视觉设计专业，需要对作品集进行优化，希望得到资深设计师的建议和指导。",
    tags: ["设计", "作品集", "求职指导", "UI设计"],
    priceRange: "¥120-180/小时",
    estimatedHours: "预计2小时",
    publishDate: "2023-06-12",
    user: {
      name: "王芳",
      school: "中国美术学院",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg"
    }
  },
  {
    id: "5",
    title: "运营岗位职业发展规划咨询",
    status: "progress",
    description: "现从事电商运营2年，想了解未来职业发展方向和所需能力，希望得到运营总监级别的指导。",
    tags: ["运营", "电商", "职业规划", "能力提升"],
    priceRange: "¥160-220/小时",
    estimatedHours: "预计1-2小时",
    publishDate: "2023-06-11",
    user: {
      name: "刘洋",
      school: "复旦大学",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  }
];