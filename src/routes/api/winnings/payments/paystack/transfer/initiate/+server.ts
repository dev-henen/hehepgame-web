import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { recipientCode, amount, reason } = body;

        if (!recipientCode || !amount || !reason) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/payments/paystack/transfer/initiate'),
            basicAuth('POST', { recipientCode, amount, reason })
        );

        const apiData = await parseJSONSafe(apiResponse.json()) as {
            data?: {
                transfer_code?: string;
            };
            status?: string;
        };

        if (apiResponse.ok && apiData?.data?.transfer_code) {
            const transferCode = apiData.data.transfer_code;
            // You can now use the transfer code as needed
            console.log('Transfer code:', transferCode);
        }

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Transfer initiation error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
