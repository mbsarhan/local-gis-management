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
exports.RevokePrivilegeUseCase = void 0;
const common_1 = require("@nestjs/common");
const privileges_repository_interface_1 = require("../../domain/repositories/privileges.repository.interface");
const user_types_constant_1 = require("../../../../shared/constants/user-types.constant");
let RevokePrivilegeUseCase = class RevokePrivilegeUseCase {
    constructor(privilegesRepository) {
        this.privilegesRepository = privilegesRepository;
    }
    async execute(callerId, callerType, privilegeId) {
        const privilege = await this.privilegesRepository.findById(privilegeId);
        if (!privilege) {
            throw new common_1.NotFoundException('Privilege not found');
        }
        if (callerType === user_types_constant_1.UserTypes.PROJECT_MANAGER) {
            const callerPrivileges = await this.privilegesRepository.getUserPrivileges(callerId);
            const callerCovers = callerPrivileges.some(p => p.covers(privilege.privilegeCode) || p.privilegeCode === privilege.privilegeCode);
            if (!callerCovers) {
                throw new common_1.ForbiddenException('You can only revoke privileges within your own geographic scope');
            }
        }
        await this.privilegesRepository.delete(privilegeId);
        return { id: privilegeId };
    }
};
exports.RevokePrivilegeUseCase = RevokePrivilegeUseCase;
exports.RevokePrivilegeUseCase = RevokePrivilegeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(privileges_repository_interface_1.PRIVILEGES_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], RevokePrivilegeUseCase);
//# sourceMappingURL=revoke-privilege.use-case.js.map