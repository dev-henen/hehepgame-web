export function basicAuth(method: string, body: any) {

    const request: any = {
        headers: {
            "Content-Type": "application/json",
        },
        method: method,
    }
    if (body.access_token) {
        request.headers['Authorization'] = `${body.access_token}`;
        delete body.access_token;
    }

    if (method != 'GET') {
        request.body = JSON.stringify(body);
    }

    return request;
}

export function getEndpoint(endpoint: string) {
    let apiUrl = 'https://hehepgame-api.onrender.com/api';

    return `${apiUrl}${endpoint}`;
}