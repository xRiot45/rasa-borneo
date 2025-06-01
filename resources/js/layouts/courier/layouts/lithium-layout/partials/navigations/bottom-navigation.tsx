import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';
import bottomNavItems from './constants/bottom-nav-items';

export function BottomNavigation() {
    const page = usePage();
    const currentUrl = page.url;

    return (
        <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-neutral-800 bg-black py-6 lg:hidden dark:bg-neutral-900">
            {bottomNavItems.map((item) => {
                const isActive = currentUrl === item.href;

                return (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                    'group flex flex-col items-center justify-center text-xs transition-all',
                                    isActive ? 'font-medium text-white' : 'text-muted-foreground hover:text-white',
                                )}
                            >
                                <Icon icon={item.icon} className="h-6 w-6 transform transition-transform duration-200 ease-in-out hover:scale-110" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                            {item.title}
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </div>
    );
}
