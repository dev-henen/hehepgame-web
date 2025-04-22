import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ cookies }) {
    try {
        const accessToken = cookies.get('access_token');

        const apiResponse = await fetch(
            getEndpoint('/auth/request-verification'),
            basicAuth('POST', {access_token: accessToken})
        );

        const apiData = parseJSONSafe(await apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Request error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
