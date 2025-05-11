import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '../logo';
import mainNavItems from './constants/main-nav-items';
import rightNavItems from './constants/right-nav-items';
import { CustomerMenuContent } from './menu-content';

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function TopNavigation({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const isMobile = useIsMobile();

    return (
        <>
            <div className="border-sidebar-border/80 border-b">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-0">
                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation - Tampilkan hanya jika bukan mobile */}
                    {!isMobile && (
                        <div className="mx-auto ml-6 hidden h-full items-center justify-center space-x-6 lg:flex">
                            <NavigationMenu className="flex h-full items-stretch">
                                <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                    {mainNavItems.map((item, index) => (
                                        <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === item.href && activeItemStyles,
                                                    'h-9 cursor-pointer px-3',
                                                )}
                                            >
                                                {item.icon && <Icon icon={item.icon} className="mr-2 h-4 w-4" />}
                                                {item.title}
                                            </Link>
                                            {page.url === item.href && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    )}

                    {auth?.user === null ? (
                        <div className="ml-auto flex items-center space-x-2">
                            <Link href={route('login')}>
                                <Button variant="default" className="cursor-pointer">
                                    Masuk
                                    <Icon icon="material-symbols:login" className="ml-1" />
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button variant="outline" className="cursor-pointer">
                                    Daftar
                                    <Icon icon="mdi:register" className="ml-1" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="ml-auto flex items-center space-x-3">
                            <div className="flex items-center space-x-3 md:hidden">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link
                                                href={rightNavItems[2].href}
                                                className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                            >
                                                <span className="sr-only">{rightNavItems[2].title}</span>
                                                <Icon icon={rightNavItems[2].icon} className="size-5 opacity-80 group-hover:opacity-100" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{rightNavItems[2].title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            {!isMobile && (
                                <div className="relative flex items-center space-x-1">
                                    <div className="flex">
                                        {rightNavItems.map((item) => (
                                            <TooltipProvider key={item.title} delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Link
                                                            href={item.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                        >
                                                            <span className="sr-only">{item.title}</span>
                                                            {item.icon && (
                                                                <Icon icon={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />
                                                            )}
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{item.title}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" className="size-10 cursor-pointer rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage
                                                src={`${auth.user?.customer?.profile_image}`}
                                                alt={auth.user.full_name}
                                                className="h-full w-full object-cover"
                                            />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.full_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64" align="end">
                                    <CustomerMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
