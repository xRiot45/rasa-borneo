import { User } from '@/types';
import { usePage } from '@inertiajs/react';

interface AuthProps extends Record<string, unknown> {
    auth: {
        user: User | null;
        wishlist: number[];
    };
}

export const useAuth = () => {
    const { props } = usePage<AuthProps>();
    const user = props.auth?.user;

    const isLoggedIn = !!user;

    return {
        user,
        isLoggedIn,
    };
};
