export declare class Privilege {
    readonly id: number;
    readonly idUser: number;
    readonly idGovernorate: number | null;
    readonly idTownship: number | null;
    readonly idCommunity: number | null;
    readonly idPlanBoundary: number | null;
    readonly privilegeCode: string;
    readonly idWho: number;
    constructor(id: number, idUser: number, idGovernorate: number | null, idTownship: number | null, idCommunity: number | null, idPlanBoundary: number | null, privilegeCode: string, idWho: number);
    static buildCode(idGovernorate: number, idTownship?: number, idCommunity?: number, idPlanBoundary?: number): string;
    covers(otherCode: string): boolean;
    isCoveredBy(otherCode: string): boolean;
}
