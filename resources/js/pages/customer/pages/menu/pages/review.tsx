import EmptyData from '@/components/empty-img';
import ReviewCard from '@/components/review-card';
import CustomerLayout from '@/layouts/customer/layout';
import { MenuItem } from '@/models/reviews/menu_item_review';
import { Head } from '@inertiajs/react';

interface Props {
    data: MenuItem;
}

export default function ReviewMenuItemPage({ data }: Props) {
    const reviews = data.reviews;

    return (
        <>
            <Head title="Review Menu" />
            <CustomerLayout>
                <main className="mt-22">
                    <div>
                        <h2 className="text-lg font-bold">Daftar Ulasan</h2>
                        <p className="text-muted-foreground text-sm">Daftar ulasan yang sudah diulas untuk menu {data?.name}</p>
                    </div>

                    <div className="mt-8">
                        {reviews.length === 0 ? (
                            <EmptyData title="Belum ada ulasan" description="Belum ada ulasan untuk menu ini" />
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {reviews.map((review) => {
                                    return (
                                        <ReviewCard
                                            key={review.id}
                                            name={review.customer?.user?.full_name || 'Anonim'}
                                            avatar={review.customer?.profile_image || undefined}
                                            rating={review.rating}
                                            comment={review.comment}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </CustomerLayout>
        </>
    );
}
