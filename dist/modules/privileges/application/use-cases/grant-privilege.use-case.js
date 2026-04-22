"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantPrivilegeUseCase = void 0;
const common_1 = require("@nestjs/common");
const privileges_repository_interface_1 = require("../../domain/repositories/privileges.repository.interface");
const privilege_entity_1 = require("../../domain/entities/privilege.entity");
const user_types_constant_1 = require("../../../../shared/constants/user-types.constant");
let GrantPrivilegeUseCase = class GrantPrivilegeUseCase {
    constructor(privilegesRepository) {
        this.privilegesRepository = privilegesRepository;
    }
    async execute(callerId, callerType, idUser, idGovernorate, idTownship, idCommunity, idPlanBoundary) {
        const newCode = privilege_entity_1.Privilege.buildCode(idGovernorate, idTownship, idCommunity, idPlanBoundary);
        if (callerType === user_types_constant_1.UserTypes.PROJECT_MANAGER) {
            const callerPrivileges = await this.privilegesRepository.getUserPrivileges(callerId);
            const callerCoversNewCode = callerPrivileges.some(p => p.covers(newCode) || p.privilegeCode === newCode);
            if (!callerCoversNewCode) {
                throw new common_1.ForbiddenException('You can only grant privileges within your own geographic scope');
            }
        }
        const existingPrivileges = await this.privilegesRepository.getUserPrivileges(idUser);
        const coveredByExisting = existingPrivileges.find(p => p.covers(newCode));
        if (coveredByExisting) {
            throw new common_1.BadRequestException(`User already has a broader privilege (${coveredByExisting.privilegeCode}) that covers this one`);
        }
        const madeRedundant = existingPrivileges.filter(p => p.isCoveredBy(newCode));
        if (madeRedundant.length > 0) {
            const codes = madeRedundant.map(p => p.privilegeCode).join(', ');
            throw new common_1.BadRequestException(`The new privilege (${newCode}) would make existing privileges redundant: ${codes}. Revoke them first.`);
        }
        const id = await this.privilegesRepository.create(callerId, idUser, idGovernorate, newCode, idTownship, idCommunity, idPlanBoundary);
        return { id };
    }
};
exports.GrantPrivilegeUseCase = GrantPrivilegeUseCase;
exports.GrantPrivilegeUseCase = GrantPrivilegeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(privileges_repository_interface_1.PRIVILEGES_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GrantPrivilegeUseCase);
//# sourceMappingURL=grant-privilege.use-case.js.map