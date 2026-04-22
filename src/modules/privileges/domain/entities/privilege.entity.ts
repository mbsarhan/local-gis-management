export class Privilege {
    constructor(
        public readonly id: number,
        public readonly idUser: number,
        public readonly idGovernorate: number | null,
        public readonly idTownship: number | null,
        public readonly idCommunity: number | null,
        public readonly idPlanBoundary: number | null,
        public readonly privilegeCode: string,
        public readonly idWho: number,
    ) {}

    // Builds the privilege code from the geographic ids
    static buildCode(
        idGovernorate: number,
        idTownship?: number,
        idCommunity?: number,
        idPlanBoundary?: number,
    ): string {
        let code = `${idGovernorate}.`;
        if (idTownship)     code += `${idTownship}.`;
        if (idCommunity)    code += `${idCommunity}.`;
        if (idPlanBoundary) code += `${idPlanBoundary}.`;
        return code;
    }

    // Check if this privilege covers a given code
    // e.g. "3." covers "3.160." and "3.160.45."
    covers(otherCode: string): boolean {
        return otherCode.startsWith(this.privilegeCode);
    }

    // Check if a given code covers this privilege
    // e.g. "3." is covered by "3.160." being added means "3." is broader
    isCoveredBy(otherCode: string): boolean {
        return this.privilegeCode.startsWith(otherCode);
    }
}