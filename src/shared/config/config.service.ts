import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    get jwtSecret(): string {
        return process.env.JWT_SECRET;
    }

    get jwtRefreshSecret(): string {
        return process.env.JWT_REFRESH_SECRET;
    }

    get jwtExpiresIn(): number {
        return parseInt(process.env.JWT_EXPIRES_IN);
    }

    get jwtRefreshExpiresIn(): number {
        return parseInt(process.env.JWT_REFRESH_EXPIRES_IN);
    }

    get port(): number {
        return parseInt(process.env.PORT) || 3000;
    }
}