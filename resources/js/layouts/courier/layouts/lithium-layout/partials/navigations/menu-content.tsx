import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';

interface Props {
    user: User;
}

export function CustomerMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 p-2 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
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
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Icon icon="lets-icons:setting-fill" className="mr-2" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
                {user?.roles[0] === 'customer' && (
                    <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                        <Link className="block w-full" href={route('address-list.index')} as="button" prefetch onClick={cleanup}>
                            <Icon icon="entypo:address" className="mr-2" />
                            Daftar Alamat Saya
                        </Link>
                    </DropdownMenuItem>
                )}
                {user?.roles[0] === 'customer' && (
                    <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                        <Link className="block w-full" href={route('order-list.customerOrders')} as="button" prefetch onClick={cleanup}>
                            <Icon icon="material-symbols:receipt-long" className="mr-2" />
                            Pesanan Saya
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="cursor-pointer rounded-md p-3">
                    <Link className="block w-full" href={route('home')} as="button" prefetch onClick={cleanup}>
                        <Icon icon="mdi:chat-question-outline" className="mr-2" />
                        Bantuan
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
