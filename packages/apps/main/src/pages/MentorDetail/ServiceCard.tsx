import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { DaySchedule, Service } from '../../types';
import BookingModal from './BookingModal';

interface ServiceCardProps {
  service: Service;
  mentorName: string;
  availability: DaySchedule[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  mentorName,
  availability
}) => {
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);

  return (
    <Card className="mb-4">
      <h3 className="text-lg font-medium">{service.title}</h3>
      <p className="text-gray-600 mt-2">{service.description}</p>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-indigo-600">
            ¥{service.price}
          </span>
          <span className="text-gray-500 text-sm ml-1">
            /{service.duration}分钟
          </span>
        </div>
        <Button 
          type="primary"
          onClick={() => setIsBookingModalVisible(true)}
        >
          立即预约
        </Button>
      </div>

      <BookingModal
        visible={isBookingModalVisible}
        onClose={() => setIsBookingModalVisible(false)}
        service={service}
        mentorName={mentorName}
        availability={availability}
      />
    </Card>
  );
};

export default ServiceCard;