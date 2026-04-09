import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    generateAccessToken(payload: { userId: number; userType: number }): string {
        return this.jwtService.sign(payload, {
            secret:    this.configService.jwtSecret,
            expiresIn: this.configService.jwtExpiresIn,
        });
    }

    generateRefreshToken(payload: { userId: number }): string {
        return this.jwtService.sign(payload, {
            secret:    this.configService.jwtRefreshSecret,
            expiresIn: this.configService.jwtRefreshExpiresIn,
        });
    }

    verifyAccessToken(token: string): any {
        return this.jwtService.verify(token, {
            secret: this.configService.jwtSecret,
        });
    }

    verifyRefreshToken(token: string): any {
        return this.jwtService.verify(token, {
            secret: this.configService.jwtRefreshSecret,
        });
    }
}