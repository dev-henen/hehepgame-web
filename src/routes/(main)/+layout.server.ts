import type { LayoutServerLoad } from './$types';
import { parseJSONSafe } from '$lib/functions';
import { redirect } from '@sveltejs/kit';
import type { User } from './types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
    const user = {
        isLoggedIn: false,
        data: {},
    } as { isLoggedIn: boolean, data: User, };

    try {
        const getUser = await fetch('/api/users/me', {
            method: 'GET'
        });
        if (getUser.status === 200) {
            user.isLoggedIn = true;
            user.data = parseJSONSafe(await getUser.json()) as User;
        }
    } catch (e) {
        console.log('Error fetching user data:', e);
    }

    if (!user.isLoggedIn && url.pathname !== '/') {
        throw redirect(302, '/auth/login');
    } else if (user.isLoggedIn && !user.data.isEmailVerified) {
        throw redirect(302, '/auth/verify-otp');
    }

    return {
        user,
        pathname: url.pathname,
    };
};