export const LayerPermissionsQueries = {

    findAll: () => ({
        sql: `
            SELECT
                r.id,
                r.id_user,
                u.name          AS user_name,
                r.id_layer,
                l.name          AS layer_name,
                l.arabic_name   AS layer_arabic_name,
                r.select_b,
                r.insert_b,
                r.update_b,
                r.delete_b
            FROM role_user_type_layer_view r
            JOIN users u ON u.id = r.id_user
            JOIN layer l ON l.id = r.id_layer
            ORDER BY u.name, l.name
        `,
        params: [],
    }),

    findByUser: (idUser: number) => ({
        sql: `
            SELECT
                r.id,
                r.id_user,
                r.id_layer,
                l.name          AS layer_name,
                l.arabic_name   AS layer_arabic_name,
                r.select_b,
                r.insert_b,
                r.update_b,
                r.delete_b
            FROM role_user_type_layer_view r
            JOIN layer l ON l.id = r.id_layer
            WHERE r.id_user = $1
            ORDER BY l.name
        `,
        params: [idUser],
    }),

    getUsernameById: (idUser: number) => ({
        sql:    `SELECT username FROM users WHERE id = $1 AND isactive = true`,
        params: [idUser],
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