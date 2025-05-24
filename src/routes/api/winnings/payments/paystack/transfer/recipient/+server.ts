import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { name, accountNumber, bankCode } = body;

        if (!name || !accountNumber || !bankCode) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/payments/paystack/transfer/recipient'),
            basicAuth('POST', { name, accountNumber, bankCode })
        );

        const apiData = await parseJSONSafe(await apiResponse.json()) as {
            success?: boolean;
            message?: string;
            data?: {
                recipient_code?: string;
                [key: string]: any;
            };
        };

        if (apiResponse.ok && apiData?.success && apiData?.data?.recipient_code) {
            const recipientCode = apiData.data.recipient_code;
            console.log('Recipient code:', recipientCode);
        } else {
            console.error('Failed to create recipient:', apiData?.message || 'Unknown error');
        }

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Recipient creation error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
