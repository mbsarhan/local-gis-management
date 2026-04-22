import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { UserTypes } from '../constants/user-types.constant';

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly allowedTypes: number[];

    constructor(...allowedTypes: number[]) {
        this.allowedTypes = allowedTypes;
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const userType = request.userType;

        if (!this.allowedTypes.includes(userType)) {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        return true;
    }
}

// Pre-built instances for cleaner usage in controllers
export const AdminGuard = new RolesGuard(UserTypes.ADMIN);
export const AdminOrManagerGuard = new RolesGuard(UserTypes.ADMIN, UserTypes.PROJECT_MANAGER);