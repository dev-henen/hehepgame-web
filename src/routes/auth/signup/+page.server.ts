import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const accessToken = cookies.get('access_token');

    if (accessToken) {
        throw redirect(302, '/');
    }

    return {};
};