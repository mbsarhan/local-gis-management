require('dotenv').config();
const express      = require('express');
const errorHandler = require('./middleware/errorHandler');
const usersRouter  = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────
app.use('/api/users', usersRouter);

// ── Health check ─────────────────────────────────────────────
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// ── Global error handler (must be last) ──────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;