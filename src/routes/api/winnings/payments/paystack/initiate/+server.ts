import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { email, amount, callbackUrl } = body;

        if (!email || !amount || !callbackUrl) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/payments/paystack/initiate'),
            basicAuth('POST', { email, amount, callbackUrl })
        );

        const apiData = await parseJSONSafe(apiResponse.json()) as {
            data?: {
                reference?: string;
            };
            status?: string;
        };

        if (apiResponse.ok && apiData?.data?.reference) {
            const reference = apiData.data.reference;
            // You can now use the reference as needed
            console.log('Payment reference:', reference);
        }

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Payment initiation error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
