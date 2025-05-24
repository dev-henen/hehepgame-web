import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ params, request }) {
    try {
        const { reference } = params as { reference?: string };

        if (!reference) {
            return json({ error: 'Missing payment reference' }, { status: 400 });
        }

        const body = await request.json();

        const apiResponse = await fetch(
            getEndpoint(`/payments/paystack/verify/${reference}`),
            basicAuth('GET', body)
        );

        const apiData = await parseJSONSafe(apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Payment verification error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
