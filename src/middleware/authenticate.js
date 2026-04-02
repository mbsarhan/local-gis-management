const { callFunctionScalar } = require('../db');

/**
 * Auth middleware — validates the token on every request.
 * Expects the token to be in the Authorization header:
 *   Authorization: Bearer <token>
 *
 * If valid, attaches the user id to req.userId and the raw
 * token to req.token so controllers can pass it to DB functions.
 */
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        // Calls the authenticate() function we wrote in PostgreSQL.
        // It returns the user's id if valid, throws an exception if not.
        const userId = await callFunctionScalar('public.authenticate', [token]);

        // Attach to request so controllers don't have to extract it again
        req.userId = userId;
        req.token  = token;

        next();
    } catch (err) {
        // The DB function raises an exception for invalid/inactive tokens
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticate;