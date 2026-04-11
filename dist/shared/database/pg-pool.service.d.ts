import { OnModuleDestroy } from '@nestjs/common';
export declare class PgPoolService implements OnModuleDestroy {
    private pool;
    constructor();
    onModuleDestroy(): Promise<void>;
    callFunction(funcName: string, params?: any[]): Promise<any[]>;
    callFunctionScalar(funcName: string, params?: any[]): Promise<any>;
    query(sql: string, params?: any[]): Promise<any[]>;
    quoteIdentifier(value: string): string;
    quoteLiteral(value: string): string;
}
