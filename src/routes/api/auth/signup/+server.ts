import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request, cookies }) {
    try {
        const body = await request.json();

        const { name, dateOfBirth, email, password } = body;

        if (!name || !dateOfBirth || !email || !password) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/auth/signup'),
            basicAuth('POST', { name, dateOfBirth, email, password })
        );

        const apiData = parseJSONSafe(await apiResponse.json()) as {
            token: string;
            message: string;
        };

        if (apiResponse.status === 201)  {
            cookies.set('access_token', apiData.token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 365, // 1 year
                sameSite: 'strict',
                path: '/'
            });
        }

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Signup error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
