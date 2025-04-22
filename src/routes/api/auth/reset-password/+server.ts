import { json } from '@sveltejs/kit';
import { basicAuth, getEndpoint } from '$lib/server/utilities';
import { parseJSONSafe } from '$lib/functions';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { token, newPassword, confirmPassword } = body;

        if (!token || !newPassword || !confirmPassword) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const apiResponse = await fetch(
            getEndpoint('/auth/reset-password'),
            basicAuth('POST', { token, newPassword, confirmPassword })
        );

        const apiData = parseJSONSafe(await apiResponse.json());

        return json(apiData, { status: apiResponse.status });
    } catch (error) {
        console.error('Password reset error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}
