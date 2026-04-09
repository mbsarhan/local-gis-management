"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.HttpException) {
            return response
                .status(exception.getStatus())
                .json({ error: exception.message });
        }
        if (exception.code) {
            if (exception.code === '23505') {
                return response.status(common_1.HttpStatus.CONFLICT).json({ error: 'Record already exists' });
            }
            if (exception.code === '23503') {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'Referenced record does not exist' });
            }
            if (exception.code === 'P0001') {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({ error: exception.message });
            }
        }
        console.error(exception);
        return response
            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal server error' });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map