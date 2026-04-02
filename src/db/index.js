const pool = require('./pool');

/**
 * Execute a raw SQL query
 * @param {string} text - SQL query string
 * @param {Array}  params - Query parameters
 */
const query = async (text, params) => {
    const result = await pool.query(text, params);
    return result;
};

/**
 * Call a PostgreSQL function and return all rows
 * @param {string} funcName - Function name (e.g. 'get_all_users')
 * @param {Array}  params   - Function arguments in order
 */
const callFunction = async (funcName, params = []) => {
    const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `SELECT * FROM ${funcName}(${placeholders})`;
    const result = await pool.query(sql, params);
    return result.rows;
};

/**
 * Call a PostgreSQL function and return a single value (e.g. RETURNS integer)
 * @param {string} funcName - Function name
 * @param {Array}  params   - Function arguments in order
 */
const callFunctionScalar = async (funcName, params = []) => {
    const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `SELECT ${funcName}(${placeholders}) AS result`;
    const result = await pool.query(sql, params);
    return result.rows[0].result;
};

module.exports = { query, callFunction, callFunctionScalar };