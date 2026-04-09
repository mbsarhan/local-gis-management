import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../services/token.service';
export declare class RefreshTokenGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
