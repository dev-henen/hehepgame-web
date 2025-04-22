import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function GET({ url }) {
    try {

        const page = url.searchParams.get('page') || '1';
        const limit = url.searchParams.get('limit') || '5';

        const apiResponse = await fetch(
            getEndpoint(`/winnings/recent?page=${page}&limit=${limit}`),
            basicAuth('GET')
        );

        const apiData = parseJSONSafe(await apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
