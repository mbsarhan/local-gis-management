import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Refresh token missing');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = this.tokenService.verifyRefreshToken(token);

            request.userId       = payload.userId;
            request.refreshToken = token;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
    }
}