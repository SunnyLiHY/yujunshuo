import React from 'react';
import TeamMember, { TeamMemberProps } from './TeamMember';
import MissionCard, { MissionCardProps } from './MissionCard';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const teamMembers: TeamMemberProps[] = [
  {
    name: '王志远',
    title: '创始人 & CEO',
    description: '前阿里巴巴产品总监，拥有10年互联网产品经验',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
  },
  {
    name: '林雨晴',
    title: '联合创始人 & COO',
    description: '前腾讯HR总监，人力资源管理专家',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  // ... 其他团队成员
];

const missions: MissionCardProps[] = [
  {
    icon: 'handshake',
    title: '连接',
    description: '搭建求学者与引导者之间的桥梁，促进知识和经验的传递与共享。',
  },
  {
    icon: 'lightbulb',
    title: '启发',
    description: '通过真实的职场信息和专业的指导，启发求学者对职业发展的思考。',
  },
  {
    icon: 'heart',
    title: '成长',
    description: '助力求学者和引导者在交流中共同成长，实现个人价值和社会价值。',
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 关于我们标题 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">关于与君说</h1>
            <p className="mt-4 text-lg text-gray-600">连接求学者与引导者的桥梁，助力职业规划与发展</p>
          </div>

          {/* 我们的故事 */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">我们的故事</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                与君说诞生于2023年，源于创始团队对当代大学生职业规划困境的深刻理解。我们发现，许多大学生在面临职业选择时，往往缺乏真实的行业信息和专业的指导，导致职业发展道路上充满迷茫和不确定性。
              </p>

              <p className="mb-4">
                同时，我们也看到，社会上有大量已经在各行各业取得成就的职场人士，他们拥有丰富的经验和见解，愿意分享自己的职业心得，帮助later者少走弯路。然而，这两类人群之间缺乏有效的连接渠道。
              </p>

              <p className="mb-4">
                基于这一洞察，我们创建了"与君说"平台，旨在搭建求学者与引导者之间的桥梁，通过一对一的深度交流，为大学生提供个性化的职业规划指导和经验分享，帮助他们更好地规划自己的职业发展路径。
              </p>
              {/* ... 其他段落 */}
            </div>
          </div>

          {/* 我们的使命 */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">我们的使命</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missions.map((mission, index) => (
                <MissionCard key={index} icon={mission.icon} title={mission.title} description={mission.description} />
              ))}
              {/* ... 其他使命卡片 */}
            </div>
          </div>

          {/* 我们的团队 */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">我们的团队</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>

          {/* 联系我们 */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
