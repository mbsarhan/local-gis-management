"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsQueries = void 0;
exports.ProjectsQueries = {
    findAll: () => ({
        sql: `
            SELECT
                rap.id,
                rap.id_projecte_manager,
                pm.name                              AS project_manager_name,
                rap.date_assignment_projecte_manager,
                rap.projecte_start_date,
                rap.projecte_end_date,
                rap.id_drawer_1,
                d1.name                              AS drawer_1_name,
                rap.date_assignment_drawer_1,
                rap.drawer_1_start_date,
                rap.drawer_1_end_date,
                rap.id_drawer_2,
                d2.name                              AS drawer_2_name,
                rap.date_assignment_drawer_2,
                rap.drawer_2_start_date,
                rap.drawer_2_end_date,
                rap.id_project_status,
                srap.name                            AS status_name,
                rap.id_layer,
                l.name                               AS layer_name,
                rap.id_plan_boundary
            FROM regulatory_area_projects rap
            LEFT JOIN users pm   ON pm.id  = rap.id_projecte_manager
            LEFT JOIN users d1   ON d1.id  = rap.id_drawer_1
            LEFT JOIN users d2   ON d2.id  = rap.id_drawer_2
            LEFT JOIN status_regular_area_project srap ON srap.id = rap.id_project_status
            LEFT JOIN layer l    ON l.id   = rap.id_layer
            ORDER BY rap.id DESC
        `,
        params: [],
    }),
    hasOtherActiveProjects: (userId, planBoundaryId, excludeProjectId) => ({
        sql: `
            SELECT COUNT(*) AS count
            FROM regulatory_area_projects
            WHERE id_plan_boundary = $1
              AND id != $2
              AND id_project_status NOT IN (12)
              AND (id_drawer_1 = $3 OR id_drawer_2 = $3)
        `,
        params: [planBoundaryId, excludeProjectId, userId],
    }),
};
//# sourceMappingURL=projects.queries.js.map