import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PgPoolService implements OnModuleDestroy {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            host:     process.env.DB_HOST,
            port:     parseInt(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user:     process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

    /**
     * Call a PostgreSQL function that returns a table (multiple rows)
     */
    async callFunction(funcName: string, params: any[] = []): Promise<any[]> {
        const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
        const sql = `SELECT * FROM ${funcName}(${placeholders})`;
        const result = await this.pool.query(sql, params);
        return result.rows;
    }

    /**
     * Call a PostgreSQL function that returns a single scalar value
     */
    async callFunctionScalar(funcName: string, params: any[] = []): Promise<any> {
        const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
        const sql = `SELECT ${funcName}(${placeholders}) AS result`;
        const result = await this.pool.query(sql, params);
        return result.rows[0].result;
    }

    /**
     * Run a raw SQL query directly (for PostGIS queries)
     */
    async query(sql: string, params: any[] = []): Promise<any[]> {
        const result = await this.pool.query(sql, params);
        return result.rows;
    }
}