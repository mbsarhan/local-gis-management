"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegesQueries = void 0;
exports.PrivilegesQueries = {
    findAll: () => ({
        sql: `
            SELECT
                up.id,
                up.id_user,
                u.name                  AS user_name,
                up.id_governorate,
                up.id_township,
                up.id_community,
                up.id_plan_boundary,
                up.privilege_code,
                up.id_who,
                w.name                  AS granted_by
            FROM user_privilege up
            LEFT JOIN users u ON u.id = up.id_user
            LEFT JOIN users w ON w.id = up.id_who
            ORDER BY up.id_user, up.privilege_code
        `,
        params: [],
    }),
    findByUser: (userId) => ({
        sql: `
            SELECT
                up.id,
                up.id_user,
                up.id_governorate,
                up.id_township,
                up.id_community,
                up.id_plan_boundary,
                up.privilege_code,
                up.id_who
            FROM user_privilege up
            WHERE up.id_user = $1
            ORDER BY up.privilege_code
        `,
        params: [userId],
    }),
};
//# sourceMappingURL=privileges.queries.js.map