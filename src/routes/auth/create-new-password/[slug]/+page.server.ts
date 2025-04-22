import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        throw redirect(302, '/auth/login');
    }

    return { token: slug };
};