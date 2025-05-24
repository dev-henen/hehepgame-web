import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const apiResponse = await fetch(
            getEndpoint('/payments/paystack/banks'),
            basicAuth('GET', body)
        );

        const apiData = await parseJSONSafe(apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Bank retrieval error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
