import React from 'react';
import { Review } from '../../types';

interface ReviewSectionProps {
  reviews: Review[];
}
/**
 * 用户评价
 * @param reviews 评价列表 
 * @returns 
 */
const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center">
            <img
              src={review.user.avatar}
              alt={review.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-medium">{review.user.name}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-600">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;