"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Privilege = void 0;
class Privilege {
    constructor(id, idUser, idGovernorate, idTownship, idCommunity, idPlanBoundary, privilegeCode, idWho) {
        this.id = id;
        this.idUser = idUser;
        this.idGovernorate = idGovernorate;
        this.idTownship = idTownship;
        this.idCommunity = idCommunity;
        this.idPlanBoundary = idPlanBoundary;
        this.privilegeCode = privilegeCode;
        this.idWho = idWho;
    }
    static buildCode(idGovernorate, idTownship, idCommunity, idPlanBoundary) {
        let code = `${idGovernorate}.`;
        if (idTownship)
            code += `${idTownship}.`;
        if (idCommunity)
            code += `${idCommunity}.`;
        if (idPlanBoundary)
            code += `${idPlanBoundary}.`;
        return code;
    }
    covers(otherCode) {
        return otherCode.startsWith(this.privilegeCode);
    }
    isCoveredBy(otherCode) {
        return this.privilegeCode.startsWith(otherCode);
    }
}
exports.Privilege = Privilege;
//# sourceMappingURL=privilege.entity.js.map