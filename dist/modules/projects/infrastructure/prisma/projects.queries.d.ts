export declare const ProjectsQueries: {
    findAll: () => {
        sql: string;
        params: any[];
    };
    hasOtherActiveProjects: (userId: number, planBoundaryId: number, excludeProjectId: number) => {
        sql: string;
        params: number[];
    };
};
