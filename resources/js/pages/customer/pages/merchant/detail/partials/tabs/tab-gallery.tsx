import EmptyImage from '@/assets/errors/empty.svg';
import { Skeleton } from '@/components/ui/skeleton';
import { StoreGallery } from '@/models/store-management/store-gallery';

interface Props {
    data: StoreGallery[];
}

const TabGalleryContent: React.FC<Props> = ({ data }) => {
    const isLoading = !data;
    return (
        <>
            <main>
                <div className="mb-6">
                    <h2 className="text-lg font-bold">Galeri Toko</h2>
                    <p className="text-muted-foreground text-sm">Daftar galeri toko yang tersedia</p>
                </div>
                {isLoading ? (
                    <div className="columns-1 gap-3 space-y-3 sm:columns-2 md:columns-2 lg:columns-3">
                        {[...Array(6)].map((_, index) => (
                            <Skeleton key={index} className="h-48 w-full rounded-lg" />
                        ))}
                    </div>
                ) : data.length > 0 ? (
                    <div className="columns-1 gap-3 space-y-3 sm:columns-2 md:columns-2 lg:columns-3">
                        {data.map((item, index) => (
                            <div key={index} className="group relative">
                                <img
                                    src={`${item.image_url}`}
                                    alt="file"
                                    className="h-auto w-full cursor-pointer rounded-lg shadow-none transition duration-300 ease-in-out group-hover:brightness-[50%]"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <div className="flex grow items-center px-6 xl:px-10">
                            <div className="mx-auto text-center">
                                <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                                <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Tidak Ada Galeri</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Galeri tidak tersedia untuk saat ini, silahkan kembali beberapa saat lagi.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default TabGalleryContent;
