import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faLightbulb,
  faHeart,
  faUsers,
  faRocket,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

export interface MissionCardProps {
  icon: 'handshake' | 'lightbulb' | 'heart' | 'users' | 'rocket' | 'graduation';
  title: string;
  description: string;
}

const iconMap: Record<MissionCardProps['icon'], IconProp> = {
  handshake: faHandshake,
  lightbulb: faLightbulb,
  heart: faHeart,
  users: faUsers,
  rocket: faRocket,
  graduation: faGraduationCap
};

const MissionCard: React.FC<MissionCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
          <FontAwesomeIcon 
            icon={iconMap[icon]} 
            className="text-2xl"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MissionCard;