import EmptyImg from '@/assets/errors/empty.svg';

interface Props {
    title: string;
    description: string;
}

const EmptyData: React.FC<Props> = ({ title, description }) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex grow items-center px-6 xl:px-10">
                    <div className="mx-auto text-center">
                        <img src={EmptyImg} alt="Error" className="mx-auto mb-8 w-full max-w-lg lg:mb-12 2xl:mb-16" />
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmptyData;
