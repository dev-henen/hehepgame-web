import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    // Delete the auth cookie
    cookies.delete('access_token', { path: '/' });

};
