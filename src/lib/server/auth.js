import pool from "./database.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
 
const SESSION_DURATION_DAYS = 30;
 
 
/**
* Hash password for registration
*/
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
 
 
/**
* Verify password during login
*/
export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
 
 
/**
* Create session after login
*/
export async function createSession(userId) {
 
    const sessionId = randomUUID();
 
    await pool.execute(
        `INSERT INTO sessions (id, user_id)
         VALUES (?, ?)`,
        [sessionId, userId]
    );
 
    return sessionId;
}
 
 
/**
* Get logged-in user from session
*/
export async function validateSession(sessionId) {
 
    if (!sessionId) {
        return null;
    }
 
    const [rows] = await pool.execute(
        `SELECT
            u.id,
            u.username,
            u.role
         FROM sessions s
         JOIN users u
            ON u.id = s.user_id
         WHERE s.id = ?
         AND s.created_at > DATE_SUB(NOW(), INTERVAL ? DAY)`,
        [sessionId, SESSION_DURATION_DAYS]
    );
 
    return rows[0] || null;
}
 
 
/**
* Logout user
*/
export async function invalidateSession(sessionId) {
 
    if (!sessionId) {
        return;
    }
 
    await pool.execute(
        `DELETE FROM sessions
         WHERE id = ?`,
        [sessionId]
    );
}
 
 
/**
* Delete expired sessions
*/
export async function deleteExpiredSessions() {
 
    await pool.execute(
        `DELETE FROM sessions
         WHERE created_at <= DATE_SUB(NOW(), INTERVAL ? DAY)`,
        [SESSION_DURATION_DAYS]
    );
}