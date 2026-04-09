"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../shared/config/config.service");
const jwt_1 = require("@nestjs/jwt");
const users_controller_1 = require("./presentation/users.controller");
const users_raw_sql_repository_1 = require("./infrastructure/raw-sql/users.raw-sql.repository");
const users_repository_interface_1 = require("./domain/repositories/users.repository.interface");
const token_service_1 = require("../../shared/services/token.service");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const refresh_token_guard_1 = require("../../shared/guards/refresh-token.guard");
const login_use_case_1 = require("./application/use-cases/login.use-case");
const logout_use_case_1 = require("./application/use-cases/logout.use-case");
const refresh_token_use_case_1 = require("./application/use-cases/refresh-token.use-case");
const get_all_users_use_case_1 = require("./application/use-cases/get-all-users.use-case");
const add_user_use_case_1 = require("./application/use-cases/add-user.use-case");
const deactivate_user_use_case_1 = require("./application/use-cases/deactivate-user.use-case");
const reactivate_user_use_case_1 = require("./application/use-cases/reactivate-user.use-case");
const change_password_use_case_1 = require("./application/use-cases/change-password.use-case");
const change_user_type_use_case_1 = require("./application/use-cases/change-user-type.use-case");
const useCases = [
    login_use_case_1.LoginUseCase,
    logout_use_case_1.LogoutUseCase,
    refresh_token_use_case_1.RefreshTokenUseCase,
    get_all_users_use_case_1.GetAllUsersUseCase,
    add_user_use_case_1.AddUserUseCase,
    deactivate_user_use_case_1.DeactivateUserUseCase,
    reactivate_user_use_case_1.ReactivateUserUseCase,
    change_password_use_case_1.ChangePasswordUseCase,
    change_user_type_use_case_1.ChangeUserTypeUseCase,
];
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        controllers: [users_controller_1.UsersController],
        providers: [
            {
                provide: users_repository_interface_1.USERS_REPOSITORY,
                useClass: users_raw_sql_repository_1.UsersRawSqlRepository,
            },
            config_service_1.ConfigService,
            token_service_1.TokenService,
            auth_guard_1.AuthGuard,
            refresh_token_guard_1.RefreshTokenGuard,
            ...useCases,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map