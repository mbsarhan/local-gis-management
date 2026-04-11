export const UsersQueries = {

    getAllUsers: (token: string) => ({
        sql:    `SELECT * FROM public.get_all_users($1)`,
        params: [token],
    }),

    getTokenByUserId: (userId: number) => ({
        sql:    `SELECT token FROM users WHERE id = $1`,
        params: [userId],
    }),

    createRole: (quotedUsername: string, quotedPassword: string) => ({
        sql:    `CREATE ROLE ${quotedUsername} WITH LOGIN PASSWORD ${quotedPassword}`,
        params: [],
    }),

    alterRoleNoLogin: (quotedUsername: string) => ({
        sql:    `ALTER ROLE ${quotedUsername} NOLOGIN`,
        params: [],
    }),

    alterRoleLogin: (quotedUsername: string) => ({
        sql:    `ALTER ROLE ${quotedUsername} LOGIN`,
        params: [],
    }),

    alterRolePassword: (quotedUsername: string, quotedPassword: string) => ({
        sql:    `ALTER ROLE ${quotedUsername} WITH PASSWORD ${quotedPassword}`,
        params: [],
    }),

};