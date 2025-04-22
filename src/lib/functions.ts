export function parseJSONSafe(data: any): object | null {
    if (typeof data === "object" && data !== null) {
        return data;
    }
    if (typeof data === "string") {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Invalid JSON string:", data);
            return null;
        }
    }
    console.error("Data is neither a valid JSON string nor an object:", data);
    return null;
}

export function formatMoney(amount: number, currency: string = 'NGN', locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

export function formatFriendlyDate(dateInput: Date | string, locale: string = 'en-US'): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function formatSuperFriendlyDate(dateInput: Date | string): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();

    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

