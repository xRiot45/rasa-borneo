import { Icon } from '@iconify/react';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Icon key={star} icon="material-symbols:star" className={star <= rating ? 'h-5 w-5 text-yellow-400' : 'h-5 w-5 text-gray-300'} />
            ))}
        </div>
    );
};

export default StarRating;
