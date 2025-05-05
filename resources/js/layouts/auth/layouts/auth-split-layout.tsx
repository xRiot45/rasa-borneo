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
        <div className="min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side (Hidden on small screens) */}
            <div className="bg-muted relative hidden flex-col justify-between p-10 text-white lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20">
                    <Link href={route('home')} className="flex items-center text-lg font-medium">
                        <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                        {name}
                    </Link>
                </div>
                {quote && (
                    <div className="relative z-20">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>

            {/* Right Side */}
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 md:px-8">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo on small screens */}
                    <div className="flex justify-center">
                        <Link href={route('home')} className="flex items-center">
                            <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                        </Link>
                    </div>
                    <div className="mb-10 space-y-4 text-center">
                        <h1 className="text-2xl font-semibold">{title}</h1>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
