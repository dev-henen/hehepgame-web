import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';

export async function GET() {
    try {
        const apiResponse = await fetch(
            getEndpoint('/payments/paystack/transfer/user'),
            basicAuth('GET')
        );

        const apiData = apiResponse.json();

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Error fetching user transfers:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
