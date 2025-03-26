export interface Demand {
  id: string;
  title: string;
  status: 'open' | 'progress' | 'closed';
  description: string;
  tags: string[];
  priceRange: string;
  estimatedHours: string;
  publishDate: string;
  user: {
    name: string;
    school: string;
    avatar: string;
  }
}

export interface FilterOptions {
  position: string;
  status: string;
  budget: string;
}

export interface FilterTag {
  id: string;
  text: string;
}

/** 发布需求表单 */
export interface NewDemand {
  title: string;
  description: string;
  position: string;
  tags: string[];
  priceRange: string;
  estimatedHours: string;
}

/** 申请接单表单 */
export interface ApplyOrder {
  demandId: string;
  introduction: string;
  price: number;
  availableTime: string[];
  communicationMethod: string;
  contactInfo: string;
}

/** 引导者列表 */
export interface Mentor {
  id: number;
  name: string;
  avatar: string;
  company: string;
  position: string;
  rating: number;
  description: string;
  skills: string[];
  price: number;
}

export interface MentorFilterOption {
  value: string;
  label: string;
}

export interface MentorFilter {
  industry: string;
  position: string;
  companyType: string;
  priceRange: string;
}

/** 引导者详情 */
export interface MentorDetail extends Mentor {
  education: Education[];
  experience: Experience[];
  services: Service[];
  reviews: Review[];
  availability: Availability[];
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  year: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
}

export interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  date: string;
}

export interface Availability {
  date: string;
  timeSlots: string[];
}