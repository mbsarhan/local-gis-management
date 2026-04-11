export declare const UsersQueries: {
    getAllUsers: (token: string) => {
        sql: string;
        params: string[];
    };
    getTokenByUserId: (userId: number) => {
        sql: string;
        params: number[];
    };
    createRole: (quotedUsername: string, quotedPassword: string) => {
        sql: string;
        params: any[];
    };
    alterRoleNoLogin: (quotedUsername: string) => {
        sql: string;
        params: any[];
    };
    alterRoleLogin: (quotedUsername: string) => {
        sql: string;
        params: any[];
    };
    alterRolePassword: (quotedUsername: string, quotedPassword: string) => {
        sql: string;
        params: any[];
    };
};
