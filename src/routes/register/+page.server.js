import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { hashPassword } from '$lib/server/auth.js';

export const actions = {

    register: async ({ request }) => {

        const data = await request.formData();

        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            return fail(400, {
                error: 'Please fill in all fields.'
            });
        }

        // Check if username already exists
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length > 0) {
            return fail(400, {
                error: 'Username already exists.'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        await pool.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        throw redirect(303, '/login');
    }
};