import type { PageServerLoad } from './$types';
import { parseJSONSafe } from '$lib/functions';

interface WinningsResponse {
    data: {
        _id: string;
        name: string;
        userId: string;
        amount: number;
        createdAt: string;
        icon: string;
        source: string;
        winner: {
            name: string;
        }
        date: string;
    }[];
}

export const load: PageServerLoad = async ({ fetch }) => {
    let topWinnings = {} as WinningsResponse;
    let recentWinnings = {} as WinningsResponse;

    try {
        const getTopWinnings = await fetch('/api/winnings/top?page=1&limit=3', {
            method: 'GET'
        });
        if (getTopWinnings.status === 200) {
            topWinnings = parseJSONSafe(await getTopWinnings.json()) as WinningsResponse
        }
    } catch (e) {
        console.log('Error fetching top winning data:', e);
    }
   
    try {
        const getRecentWinnings = await fetch('/api/winnings/recent?page=1&limit=3', {
            method: 'GET'
        });
        if (getRecentWinnings.status === 200) {
            recentWinnings = parseJSONSafe(await getRecentWinnings.json()) as WinningsResponse
        }
    } catch (e) {
        console.log('Error fetching recent winning data:', e);
    }

    return {
        topWinnings,
        recentWinnings,
    };
};