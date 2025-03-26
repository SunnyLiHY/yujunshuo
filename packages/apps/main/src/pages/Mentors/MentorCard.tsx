import React from 'react';
import { Mentor } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <div className="card">
      <div className="p-6">
        <div className="flex items-center">
          <img className="h-16 w-16 rounded-full" src={mentor.avatar} alt="" />
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-500">
              {mentor.position} @ {mentor.company}
            </p>
            <div className="mt-1 flex items-center">
              {[...Array(5)].map(
                (_, i) =>
                  i + 1 <= Math.ceil(mentor.rating || 0) && (
                    <FontAwesomeIcon
                      key={i}
                      icon={i + 1 <= (mentor.rating || 0) ? faStar : faStarHalfAlt}
                      className="text-yellow-400"
                    />
                  ),
              )}
              <span className="ml-1 text-sm text-gray-500">({mentor.rating})</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">{mentor.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mentor.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">¥{mentor.price}/小时</span>
          <Link to={`/mentor-detail/${mentor.id}`} className="btn-primary">
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
