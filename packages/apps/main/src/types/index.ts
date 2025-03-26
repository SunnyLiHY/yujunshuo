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