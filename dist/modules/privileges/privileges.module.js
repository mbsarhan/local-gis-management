"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const privileges_controller_1 = require("./presentation/privileges.controller");
const privileges_prisma_repository_1 = require("./infrastructure/prisma/privileges.prisma.repository");
const privileges_repository_interface_1 = require("./domain/repositories/privileges.repository.interface");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const token_service_1 = require("../../shared/services/token.service");
const config_service_1 = require("../../shared/config/config.service");
const get_all_privileges_use_case_1 = require("./application/use-cases/get-all-privileges.use-case");
const get_user_privileges_use_case_1 = require("./application/use-cases/get-user-privileges.use-case");
const grant_privilege_use_case_1 = require("./application/use-cases/grant-privilege.use-case");
const revoke_privilege_use_case_1 = require("./application/use-cases/revoke-privilege.use-case");
const useCases = [
    get_all_privileges_use_case_1.GetAllPrivilegesUseCase,
    get_user_privileges_use_case_1.GetUserPrivilegesUseCase,
    grant_privilege_use_case_1.GrantPrivilegeUseCase,
    revoke_privilege_use_case_1.RevokePrivilegeUseCase,
];
let PrivilegesModule = class PrivilegesModule {
};
exports.PrivilegesModule = PrivilegesModule;
exports.PrivilegesModule = PrivilegesModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        controllers: [privileges_controller_1.PrivilegesController],
        providers: [
            {
                provide: privileges_repository_interface_1.PRIVILEGES_REPOSITORY,
                useClass: privileges_prisma_repository_1.PrivilegesPrismaRepository,
            },
            auth_guard_1.AuthGuard,
            token_service_1.TokenService,
            config_service_1.ConfigService,
            ...useCases,
        ],
    })
], PrivilegesModule);
//# sourceMappingURL=privileges.module.js.map