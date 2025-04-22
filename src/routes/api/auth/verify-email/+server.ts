import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request, cookies }) {
    try {
        const body = await request.json();
        const accessToken = cookies.get('access_token');

        const { otp } = body;

        if (!otp) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/auth/verify-email'),
            basicAuth('POST', { otp, access_token: accessToken })
        );

        const apiData = parseJSONSafe(await apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Verification error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
