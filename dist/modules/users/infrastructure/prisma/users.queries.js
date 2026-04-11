"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersQueries = void 0;
exports.UsersQueries = {
    getAllUsers: (token) => ({
        sql: `SELECT * FROM public.get_all_users($1)`,
        params: [token],
    }),
    getTokenByUserId: (userId) => ({
        sql: `SELECT token FROM users WHERE id = $1`,
        params: [userId],
    }),
    createRole: (quotedUsername, quotedPassword) => ({
        sql: `CREATE ROLE ${quotedUsername} WITH LOGIN PASSWORD ${quotedPassword}`,
        params: [],
    }),
    alterRoleNoLogin: (quotedUsername) => ({
        sql: `ALTER ROLE ${quotedUsername} NOLOGIN`,
        params: [],
    }),
    alterRoleLogin: (quotedUsername) => ({
        sql: `ALTER ROLE ${quotedUsername} LOGIN`,
        params: [],
    }),
    alterRolePassword: (quotedUsername, quotedPassword) => ({
        sql: `ALTER ROLE ${quotedUsername} WITH PASSWORD ${quotedPassword}`,
        params: [],
    }),
};
//# sourceMappingURL=users.queries.js.map