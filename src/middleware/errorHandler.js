/**
 * Global error handler — catches anything that slips through
 * controller try/catch blocks and returns a clean JSON response.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // PostgreSQL errors have a 'code' property
    if (err.code) {
        // Unique constraint violation
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Record already exists' });
        }
        // Foreign key violation
        if (err.code === '23503') {
            return res.status(400).json({ error: 'Referenced record does not exist' });
        }
        // PL/pgSQL raised exception (RAISE EXCEPTION in our DB functions)
        if (err.code === 'P0001') {
            return res.status(400).json({ error: err.message });
        }
    }

    return res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;