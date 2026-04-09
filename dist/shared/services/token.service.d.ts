import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    generateAccessToken(payload: {
        userId: number;
        userType: number;
    }): string;
    generateRefreshToken(payload: {
        userId: number;
    }): string;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
}
