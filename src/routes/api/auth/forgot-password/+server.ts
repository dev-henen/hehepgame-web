import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { email } = body;

        if (!email) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/auth/forgot-password'),
            basicAuth('POST', { email })
        );

        const apiData = parseJSONSafe(await apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Verification error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
