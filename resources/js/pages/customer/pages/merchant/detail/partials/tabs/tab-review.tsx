import EmptyData from '@/components/empty-img';
import ReviewCard from '@/components/review-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MerchantReview, ReviewForm } from '@/models/reviews/merchant_review';
import { Icon } from '@iconify/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    merchantId: number;
    data: MerchantReview[];
}

const TabReviewContent: React.FC<Props> = ({ merchantId, data }) => {
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const {
        data: formData,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<ReviewForm>>({
        rating: 0,
        comment: '',
    });

    const handleSubmit = () => {
        post(route('merchant.review.storeReview', { merchantId: merchantId }), {
            onSuccess: () => {
                reset();
                setOpenDialog(false);
                toast.success('Success', {
                    description: 'Ulasan berhasil dikirim',
                    action: {
                        label: 'Tutup',
                        onClick: () => toast.dismiss(),
                    },
                });
            },
            onError: (errors) => {
                reset();
                Object.keys(errors).forEach((key) => {
                    toast.error('Error', {
                        description: errors[key],
                        action: {
                            label: 'Tutup',
                            onClick: () => toast.dismiss(),
                        },
                    });
                });
            },
        });
    };

    return (
        <>
            <main>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Ulasan Toko</h2>
                        <p className="text-muted-foreground text-sm">Ulasan yang telah diberikan</p>
                    </div>

                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger>
                            <Button className="cursor-pointer">
                                Tambah Ulasan
                                <Icon icon="material-symbols:rate-review" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Tambah Ulasan untuk Toko Ini</DialogTitle>
                                <DialogDescription>
                                    Berikan pendapatmu tentang pengalaman berbelanja di toko ini. Ulasanmu akan membantu pembeli lain dalam membuat
                                    keputusan.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Rating */}
                            <div className="mt-4 flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <Icon
                                            icon="material-symbols:star"
                                            className={cn(
                                                'h-8 w-8 cursor-pointer transition-colors',
                                                (hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-gray-300',
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}

                            {/* Textarea */}
                            <div className="mt-4">
                                <Label>Ulasan Anda</Label>
                                <Textarea
                                    placeholder="Tulis ulasanmu di sini..."
                                    value={formData.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    className="mt-2 min-h-[120px]"
                                />
                                {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
                            </div>

                            {/* Submit Button */}
                            <DialogFooter className="mt-4 flex justify-end">
                                <DialogTrigger asChild>
                                    <Button variant="outline">Batal</Button>
                                </DialogTrigger>
                                <Button onClick={handleSubmit} disabled={processing}>
                                    {processing ? 'Mengirim...' : 'Kirim Ulasan'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mt-6">
                    {data.length === 0 ? (
                        <EmptyData title="Belum ada ulasan" description="Toko ini belum memiliki ulasan, tambahkan ulasanmu sekarang" />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {data.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    name={review.customer?.user?.full_name || 'Anonim'}
                                    avatar={review.customer?.profile_image || undefined}
                                    rating={review.rating}
                                    comment={review.comment}
                                    created_at={review.created_at}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default TabReviewContent;
