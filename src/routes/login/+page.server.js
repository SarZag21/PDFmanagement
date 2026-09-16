import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';
 
export const actions = {
 
    login: async ({ request, cookies }) => {
 
        const data = await request.formData();
 
        const username = data.get('username');
        const password = data.get('password');
 
        if (!username || !password) {
            return fail(400, {
                error: 'Please fill in all fields.'
            });
        }
 
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
 
        const user = rows[0];
 
        if (!user || !(await verifyPassword(password, user.password))) {
            return fail(400, {
                error: 'Username or password is wrong.'
            });
        }
 
        const sessionId = await createSession(user.id);
 
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30
        });
 
        if (user.role === 'admin') {
            throw redirect(303, '/admin');
        }

        throw redirect(303, '/dashboard');
    }
};