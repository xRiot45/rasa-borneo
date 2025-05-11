import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';
import bottomNavItems from './constants/bottom-nav-items';

export function BottomNavigation() {
    const page = usePage();
    const currentUrl = page.url;

    return (
        <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-neutral-800 bg-black py-5 lg:hidden dark:bg-neutral-900">
            {bottomNavItems.map((item) => {
                const isActive = currentUrl === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'group flex flex-col items-center justify-center text-xs transition-all',
                            isActive ? 'font-medium text-white' : 'text-muted-foreground hover:text-white',
                        )}
                    >
                        <Icon icon={item.icon} className="mb-1 h-5 w-5 transform transition-transform duration-200 ease-in-out hover:scale-110" />
                        <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                );
            })}
        </div>
    );
}
