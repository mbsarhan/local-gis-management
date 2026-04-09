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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_service_1 = require("../config/config.service");
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.jwtSecret,
            expiresIn: this.configService.jwtExpiresIn,
        });
    }
    generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: this.configService.jwtRefreshSecret,
            expiresIn: this.configService.jwtRefreshExpiresIn,
        });
    }
    verifyAccessToken(token) {
        return this.jwtService.verify(token, {
            secret: this.configService.jwtSecret,
        });
    }
    verifyRefreshToken(token) {
        return this.jwtService.verify(token, {
            secret: this.configService.jwtRefreshSecret,
        });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_service_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map