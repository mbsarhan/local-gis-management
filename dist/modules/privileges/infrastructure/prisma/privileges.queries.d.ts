export declare const PrivilegesQueries: {
    findAll: () => {
        sql: string;
        params: any[];
    };
    findByUser: (userId: number) => {
        sql: string;
        params: number[];
    };
};
