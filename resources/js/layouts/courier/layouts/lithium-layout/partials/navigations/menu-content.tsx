import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';

interface Props {
    user: User;
}

export function MenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();
    const getInitials = useInitials();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 p-2 text-left text-sm">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        <AvatarImage src={`${user?.courier?.profile_image}`} alt={user.full_name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.full_name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.full_name}</span>
                        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                {(user?.roles[0] === 'merchant' || user?.roles[0] === 'admin') && (
                    <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                        <Link
                            className="block w-full"
                            href={route(user?.roles[0] === 'merchant' ? 'merchant.dashboard' : 'admin.dashboard')}
                            as="button"
                            prefetch
                            onClick={cleanup}
                        >
                            <Icon icon="material-symbols:dashboard" className="mr-2" />
                            {user?.roles[0] === 'merchant' ? 'Merchant Dashboard' : 'Admin Dashboard'}
                        </Link>
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                    <Link className="block w-full" href={route('courier.setting.edit')} as="button" prefetch onClick={cleanup}>
                        <Icon icon="lets-icons:setting-fill" className="mr-2" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                <Link className="block w-full text-red-500" method="post" href={route('logout')} as="button" onClick={cleanup}>
                    <Icon icon="material-symbols:logout-rounded" className="mr-2 text-red-500" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
