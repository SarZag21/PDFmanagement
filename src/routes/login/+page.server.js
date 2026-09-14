import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';


export const actions = {

    // Get login form data
    login: async ({ request, cookies }) => {

        const form = await request.formData();

        const username = form.get('username');
        const password = form.get('password');


        // Check if all required fields are filled
        if (!username || !password) {
            return fail(400, {
                error: 'Bitte alle Felder ausfüllen.'
            });
        }


        let rows;

        try {

            // Find user by username
            [rows] = await pool.execute(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );

        } catch (err) {

            // Database error handling
            console.log(err);

            return fail(500, {
                error: 'Datenbankfehler.'
            });
        }


        const user = rows[0];


        // Check if user exists
        if (!user) {
            return fail(400, {
                error: 'Benutzername oder Passwort ist falsch.'
            });
        }


        // Verify entered password
        const validPassword = await verifyPassword(
            password,
            user.password
        );


        if (!validPassword) {
            return fail(400, {
                error: 'Benutzername oder Passwort ist falsch.'
            });
        }


        // Create a new session for the logged-in user
        const sessionId = await createSession(user.id);


        // Store session ID in cookie
        cookies.set('session', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: 'lax'
        });


        // Admin goes to admin page
        if (user.role === 'admin') {
            throw redirect(303, '/admin');
        }


        // Normal user goes to dashboard
        throw redirect(303, '/dashboard');
    }
};