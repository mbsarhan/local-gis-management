export declare class User {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly isActive: boolean;
    readonly idUserType: number;
    readonly idGroup: number;
    readonly token?: string;
    constructor(id: number, name: string, username: string, isActive: boolean, idUserType: number, idGroup: number, token?: string);
    isInactive(): boolean;
    isSameUser(otherId: number): boolean;
}
