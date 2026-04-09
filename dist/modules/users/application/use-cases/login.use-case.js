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
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const users_repository_interface_1 = require("../../domain/repositories/users.repository.interface");
const token_service_1 = require("../../../../shared/services/token.service");
let LoginUseCase = class LoginUseCase {
    constructor(usersRepository, tokenService) {
        this.usersRepository = usersRepository;
        this.tokenService = tokenService;
    }
    async execute(username, password) {
        const user = await this.usersRepository.login(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const accessToken = this.tokenService.generateAccessToken({
            userId: user.u_id,
            userType: user.u_id_user_type,
        });
        const refreshToken = this.tokenService.generateRefreshToken({
            userId: user.u_id,
        });
        await this.usersRepository.saveRefreshToken(user.u_id, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.u_id,
                name: user.u_name,
                userType: user.u_id_user_type,
            },
        };
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(users_repository_interface_1.USERS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, token_service_1.TokenService])
], LoginUseCase);
//# sourceMappingURL=login.use-case.js.map