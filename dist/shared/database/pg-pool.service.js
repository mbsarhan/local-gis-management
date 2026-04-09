"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgPoolService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let PgPoolService = class PgPoolService {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
    async callFunction(funcName, params = []) {
        const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
        const sql = `SELECT * FROM ${funcName}(${placeholders})`;
        const result = await this.pool.query(sql, params);
        return result.rows;
    }
    async callFunctionScalar(funcName, params = []) {
        const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
        const sql = `SELECT ${funcName}(${placeholders}) AS result`;
        const result = await this.pool.query(sql, params);
        return result.rows[0].result;
    }
    async query(sql, params = []) {
        const result = await this.pool.query(sql, params);
        return result.rows;
    }
};
exports.PgPoolService = PgPoolService;
exports.PgPoolService = PgPoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PgPoolService);
//# sourceMappingURL=pg-pool.service.js.map