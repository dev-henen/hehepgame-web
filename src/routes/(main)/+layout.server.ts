import type { LayoutServerLoad } from './$types';
import { parseJSONSafe } from '$lib/functions';

export const load: LayoutServerLoad = async ({ fetch }) => {
    const user = {
        isLoggedIn: false,
        data: null,
    } as { isLoggedIn: boolean, data: any };

    try {
        const getUser = await fetch('/api/users/me', {
            method: 'GET'
        });
        if (getUser.status === 200) {
            user.isLoggedIn = true;
            user.data = parseJSONSafe(await getUser.json());
        }
    } catch (e) {
        console.log('Error fetching user data:', e);
    }

    return {
        user,
    };
};