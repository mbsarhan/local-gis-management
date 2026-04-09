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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../shared/guards/auth.guard");
const refresh_token_guard_1 = require("../../../shared/guards/refresh-token.guard");
const login_use_case_1 = require("../application/use-cases/login.use-case");
const logout_use_case_1 = require("../application/use-cases/logout.use-case");
const refresh_token_use_case_1 = require("../application/use-cases/refresh-token.use-case");
const get_all_users_use_case_1 = require("../application/use-cases/get-all-users.use-case");
const add_user_use_case_1 = require("../application/use-cases/add-user.use-case");
const deactivate_user_use_case_1 = require("../application/use-cases/deactivate-user.use-case");
const reactivate_user_use_case_1 = require("../application/use-cases/reactivate-user.use-case");
const change_password_use_case_1 = require("../application/use-cases/change-password.use-case");
const change_user_type_use_case_1 = require("../application/use-cases/change-user-type.use-case");
const users_dto_1 = require("./dto/users.dto");
let UsersController = class UsersController {
    constructor(loginUseCase, logoutUseCase, refreshTokenUseCase, getAllUsersUseCase, addUserUseCase, deactivateUserUseCase, reactivateUserUseCase, changePasswordUseCase, changeUserTypeUseCase) {
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.addUserUseCase = addUserUseCase;
        this.deactivateUserUseCase = deactivateUserUseCase;
        this.reactivateUserUseCase = reactivateUserUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
        this.changeUserTypeUseCase = changeUserTypeUseCase;
    }
    async login(dto) {
        return this.loginUseCase.execute(dto.username, dto.password);
    }
    async refresh(req) {
        return this.refreshTokenUseCase.execute(req.userId, req.refreshToken);
    }
    async logout(req) {
        return this.logoutUseCase.execute(req.userId);
    }
    async getAllUsers(req) {
        return this.getAllUsersUseCase.execute(req.userId);
    }
    async addUser(req, dto) {
        const id = await this.addUserUseCase.execute(req.userId, dto.name, dto.username, dto.password, dto.id_user_type, dto.id_group);
        return { id };
    }
    async deactivateUser(req, id) {
        return this.deactivateUserUseCase.execute(req.userId, id);
    }
    async reactivateUser(req, id) {
        return this.reactivateUserUseCase.execute(req.userId, id);
    }
    async changePassword(req, id, dto) {
        return this.changePasswordUseCase.execute(req.userId, id, dto.new_password);
    }
    async changeUserType(req, id, dto) {
        return this.changeUserTypeUseCase.execute(req.userId, id, dto.id_user_type);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Patch)(':id/reactivate'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "reactivateUser", null);
__decorate([
    (0, common_1.Patch)(':id/change-password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, users_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)(':id/change-type'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, users_dto_1.ChangeUserTypeDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeUserType", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [login_use_case_1.LoginUseCase,
        logout_use_case_1.LogoutUseCase,
        refresh_token_use_case_1.RefreshTokenUseCase,
        get_all_users_use_case_1.GetAllUsersUseCase,
        add_user_use_case_1.AddUserUseCase,
        deactivate_user_use_case_1.DeactivateUserUseCase,
        reactivate_user_use_case_1.ReactivateUserUseCase,
        change_password_use_case_1.ChangePasswordUseCase,
        change_user_type_use_case_1.ChangeUserTypeUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map