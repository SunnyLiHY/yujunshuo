import React from 'react';

export interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, title, description, image }) => {
  return (
    <div className="text-center">
      <img 
        className="h-32 w-32 rounded-full mx-auto object-cover"
        src={image}
        alt={`${name}的照片`}
        loading="lazy"
      />
      <h3 className="mt-4 text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-indigo-600">{title}</p>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default TeamMember;