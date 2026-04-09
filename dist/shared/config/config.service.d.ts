export declare class ConfigService {
    get jwtSecret(): string;
    get jwtRefreshSecret(): string;
    get jwtExpiresIn(): number;
    get jwtRefreshExpiresIn(): number;
    get port(): number;
}
