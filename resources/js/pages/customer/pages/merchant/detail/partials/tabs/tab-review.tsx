import EmptyImage from '@/assets/errors/empty.svg';

const TabReviewContent = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex grow items-center px-6 xl:px-10">
                    <div className="mx-auto text-center">
                        <img src={EmptyImage} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                        <h1 className="text-[22px] font-bold text-gray-700 dark:text-gray-100">Tidak Ada Review</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Review tidak tersedia untuk saat ini, silahkan kembali beberapa saat lagi.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabReviewContent;
