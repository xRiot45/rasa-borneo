import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { Label } from './ui/label';

interface ReviewCardProps {
    name: string;
    avatar?: string;
    rating: number;
    comment: string;
    created_at?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, avatar, rating, comment, created_at }: ReviewCardProps) => {
    return (
        <Card className="rounded-xl py-6 shadow-none">
            <CardHeader className="flex flex-row items-start space-x-2">
                <Avatar className="h-12 w-12 object-contain">
                    {avatar ? <AvatarImage src={avatar} alt={name} className="object-center" /> : <AvatarFallback>{name.charAt(0)}</AvatarFallback>}
                </Avatar>
                <div>
                    <Label className="text-sm font-medium">{name}</Label>
                    {created_at && <p className="text-muted-foreground mt-0.5 text-sm">{new Date(created_at).toLocaleDateString()}</p>}
                    <div className="mt-1 flex items-center space-x-1">
                        <span className="text-sm font-medium">{rating}</span>
                        <div className="flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-500' : i < rating ? 'fill-yellow-500 opacity-50' : 'stroke-yellow-500'}`}
                                    strokeWidth={1.5}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm leading-relaxed">{comment}</p>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
