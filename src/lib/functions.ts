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