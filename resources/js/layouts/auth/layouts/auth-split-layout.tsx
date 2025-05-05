import ImageUrl from '@/assets/images/restaurant.jpg';
import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side (Hidden on small screens) */}
            <div
                className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r"
                style={{ backgroundImage: `url(${ImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-black opacity-50" />
                <Link href={route('home')} className="relative z-20 flex items-center gap-4 text-lg font-medium">
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* Right Side */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
                    <div className="mb-10 space-y-4 text-center">
                        <h1 className="text-2xl font-semibold break-words">{title}</h1>
                        <p className="text-muted-foreground text-sm break-words">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
