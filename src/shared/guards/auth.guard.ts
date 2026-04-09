import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization header missing or malformed');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token missing');
        }

        try {
            const payload = this.tokenService.verifyAccessToken(token);

            // Attach to request for use in controllers/use-cases
            request.userId   = payload.userId;
            request.userType = payload.userType;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }
}