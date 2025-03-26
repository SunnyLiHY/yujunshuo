import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MentorDetail } from '../../types';
import ExperienceSection from './Experience';
import ReviewSection from './ReviewSection';
import ServiceCard from './ServiceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const MentorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'intro' | 'reviews' | 'calendar'>('intro');

  // 模拟数据，实际应该从API获取
  const mentorDetail: MentorDetail = {
    id: 1,
    name: '张明',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    company: '腾讯',
    position: '产品经理',
    rating: 4.5,
    description: '5年产品经验，擅长用户增长和产品规划，曾负责多个千万级用户产品',
    skills: ['产品规划', '用户增长', '数据分析'],
    price: 200,
    education: [
      {
        id: 1,
        school: '北京大学',
        degree: '硕士',
        major: '计算机科学',
        year: '2015-2018',
      },
    ],
    experience: [
      {
        id: 1,
        company: '腾讯',
        position: '高级产品经理',
        period: '2018-至今',
        description: '负责社交产品的用户增长和产品规划，带领团队实现用户数量翻倍增长',
      },
    ],
    services: [
      {
        id: 1,
        title: '职业规划咨询',
        description: '一对一职业发展规划指导，帮助你明确职业方向',
        price: 200,
        duration: 60,
      },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: '李华',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        rating: 5,
        content: '非常专业的指导，给了我很多实用的建议',
        date: '2024-03-15',
      },
    ],
    availability: [
      {
        date: '2024-03-20',
        timeSlots: ['10:00', '14:00', '16:00'],
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 基本信息卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            <img src={mentorDetail.avatar} alt={mentorDetail.name} className="w-24 h-24 rounded-full" />
            <div className="ml-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{mentorDetail.name}</h1>
                  <p className="text-lg text-gray-600">
                    {mentorDetail.position} @ {mentorDetail.company}
                  </p>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map(
                      (_, i) =>
                        i + 1 <= Math.ceil(mentorDetail.rating || 0) && (
                          <FontAwesomeIcon
                            key={i}
                            icon={i + 1 <= (mentorDetail.rating || 0) ? faStar : faStarHalfAlt}
                            className="text-yellow-400"
                          />
                        ),
                    )}
                    <span className="ml-2 text-gray-600">({mentorDetail.rating})</span>
                  </div>
                </div>
                {/* <button className="btn-primary">预约咨询</button> */}
              </div>

              <div className="mt-4">
                <p className="text-gray-600">{mentorDetail.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mentorDetail.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['intro', 'reviews', 'calendar'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab === 'intro' && '详细介绍'}
                {tab === 'reviews' && '用户评价'}
                {tab === 'calendar' && '预约日历'}
              </button>
            ))}
          </nav>
        </div>

        {/* 标签页内容 */}
        <div className="grid grid-cols-3 gap-6">
          {/* 左侧主要内容 */}
          <div className="col-span-2">
            {activeTab === 'intro' && (
              <div className="space-y-6">
                {/* 工作经历 */}
                <ExperienceSection experiences={mentorDetail.experience || []} />

                {/* 教育背景 */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">教育背景</h2>
                  {mentorDetail.education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <h3 className="font-medium">{edu.school}</h3>
                      <p className="text-gray-600">
                        {edu.degree} · {edu.major}
                      </p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </section>
              </div>
            )}

            {activeTab === 'reviews' && <ReviewSection reviews={mentorDetail.reviews || []} />}

            {activeTab === 'calendar' && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">可预约时间</h2>
                {mentorDetail.availability.map((day, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium mb-2">{day.date}</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {day.timeSlots.map((time: any, i: index) => (
                        <button
                          key={i}
                          className="py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 右侧服务卡片 */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">咨询服务</h2>
              {mentorDetail.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  mentorName={mentorDetail.name}
                  availability={mentorDetail.availability}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDetailPage;
