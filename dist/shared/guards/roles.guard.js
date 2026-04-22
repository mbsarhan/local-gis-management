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
exports.AdminOrManagerGuard = exports.AdminGuard = exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const user_types_constant_1 = require("../constants/user-types.constant");
let RolesGuard = class RolesGuard {
    constructor(...allowedTypes) {
        this.allowedTypes = allowedTypes;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userType = request.userType;
        if (!this.allowedTypes.includes(userType)) {
            throw new common_1.ForbiddenException('You do not have permission to perform this action');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], RolesGuard);
exports.AdminGuard = new RolesGuard(user_types_constant_1.UserTypes.ADMIN);
exports.AdminOrManagerGuard = new RolesGuard(user_types_constant_1.UserTypes.ADMIN, user_types_constant_1.UserTypes.PROJECT_MANAGER);
//# sourceMappingURL=roles.guard.js.map