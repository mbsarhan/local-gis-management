export const LayerPermissionsQueries = {

    findAll: () => ({
        sql: `
            SELECT
                r.id,
                r.id_user_type,
                ut.name         AS user_type_name,
                r.id_layer,
                l.name          AS layer_name,
                l.arabic_name   AS layer_arabic_name,
                r.select_b,
                r.insert_b,
                r.update_b,
                r.delete_b
            FROM role_user_type_layer_view r
            JOIN user_type ut ON ut.id = r.id_user_type
            JOIN layer     l  ON l.id  = r.id_layer
            ORDER BY ut.name, l.name
        `,
        params: [],
    }),

    findByUserType: (idUserType: number) => ({
        sql: `
            SELECT
                r.id,
                r.id_user_type,
                r.id_layer,
                l.name          AS layer_name,
                l.arabic_name   AS layer_arabic_name,
                r.select_b,
                r.insert_b,
                r.update_b,
                r.delete_b
            FROM role_user_type_layer_view r
            JOIN layer l ON l.id = r.id_layer
            WHERE r.id_user_type = $1
            ORDER BY l.name
        `,
        params: [idUserType],
    }),

    getUsernamesByType: (idUserType: number) => ({
        sql: `
            SELECT username
            FROM users
            WHERE id_user_type = $1
              AND isactive = true
              AND username IS NOT NULL
        `,
        params: [idUserType],
    }),

    grantOnTable: (quotedLayer: string, privileges: string, quotedUsername: string) => ({
        sql:    `GRANT ${privileges} ON TABLE ${quotedLayer} TO ${quotedUsername}`,
        params: [],
    }),

    revokeAllOnTable: (quotedLayer: string, quotedUsername: string) => ({
        sql:    `REVOKE ALL ON TABLE ${quotedLayer} FROM ${quotedUsername}`,
        params: [],
    }),

};