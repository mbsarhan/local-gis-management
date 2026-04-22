import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private readonly allowedTypes;
    constructor(...allowedTypes: number[]);
    canActivate(context: ExecutionContext): boolean;
}
export declare const AdminGuard: RolesGuard;
export declare const AdminOrManagerGuard: RolesGuard;
