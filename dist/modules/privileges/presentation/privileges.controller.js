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
exports.PrivilegesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../shared/guards/auth.guard");
const roles_guard_1 = require("../../../shared/guards/roles.guard");
const get_all_privileges_use_case_1 = require("../application/use-cases/get-all-privileges.use-case");
const get_user_privileges_use_case_1 = require("../application/use-cases/get-user-privileges.use-case");
const grant_privilege_use_case_1 = require("../application/use-cases/grant-privilege.use-case");
const revoke_privilege_use_case_1 = require("../application/use-cases/revoke-privilege.use-case");
const privileges_dto_1 = require("./dto/privileges.dto");
let PrivilegesController = class PrivilegesController {
    constructor(getAllPrivilegesUseCase, getUserPrivilegesUseCase, grantPrivilegeUseCase, revokePrivilegeUseCase) {
        this.getAllPrivilegesUseCase = getAllPrivilegesUseCase;
        this.getUserPrivilegesUseCase = getUserPrivilegesUseCase;
        this.grantPrivilegeUseCase = grantPrivilegeUseCase;
        this.revokePrivilegeUseCase = revokePrivilegeUseCase;
    }
    async getAllPrivileges() {
        return this.getAllPrivilegesUseCase.execute();
    }
    async getUserPrivileges(id) {
        return this.getUserPrivilegesUseCase.execute(id);
    }
    async grantPrivilege(req, dto) {
        return this.grantPrivilegeUseCase.execute(req.userId, req.userType, dto.id_user, dto.id_governorate, dto.id_township, dto.id_community, dto.id_plan_boundary);
    }
    async revokePrivilege(req, id) {
        return this.revokePrivilegeUseCase.execute(req.userId, req.userType, id);
    }
};
exports.PrivilegesController = PrivilegesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.AdminOrManagerGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrivilegesController.prototype, "getAllPrivileges", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(roles_guard_1.AdminOrManagerGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PrivilegesController.prototype, "getUserPrivileges", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.AdminOrManagerGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, privileges_dto_1.GrantPrivilegeDto]),
    __metadata("design:returntype", Promise)
], PrivilegesController.prototype, "grantPrivilege", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.AdminOrManagerGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PrivilegesController.prototype, "revokePrivilege", null);
exports.PrivilegesController = PrivilegesController = __decorate([
    (0, common_1.Controller)('privileges'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [get_all_privileges_use_case_1.GetAllPrivilegesUseCase,
        get_user_privileges_use_case_1.GetUserPrivilegesUseCase,
        grant_privilege_use_case_1.GrantPrivilegeUseCase,
        revoke_privilege_use_case_1.RevokePrivilegeUseCase])
], PrivilegesController);
//# sourceMappingURL=privileges.controller.js.map