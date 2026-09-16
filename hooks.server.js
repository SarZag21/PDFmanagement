import { validateSession } from '$lib/server/auth.js';

export async function handle({ event, resolve }) {

    const sessionId = event.cookies.get('session');
    event.locals.user = await validateSession(sessionId);
    const path = event.url.pathname;

    if (
        path.startsWith('/dashboard') &&
        event.locals.user?.role !== 'user'
    ) {
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    }

    if (
        path.startsWith('/admin') &&
        event.locals.user?.role !== 'admin'
    ) {
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    }

    return resolve(event);
}