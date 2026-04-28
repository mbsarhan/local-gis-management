import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { ILayerPermissionsRepository } from '../../domain/repositories/layer-permissions.repository.interface';
import { LayerPermission } from '../../domain/entities/layer-permission.entity';
import { LayerPermissionsQueries } from './layer-permissions.queries';

@Injectable()
export class LayerPermissionsPrismaRepository implements ILayerPermissionsRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly pgPool: PgPoolService,
    ) { }

    // ── Helpers ───────────────────────────────────────────────────────────

    private mapToEntity(row: any): LayerPermission {
        return new LayerPermission(
            row.id,
            row.id_user_type,
            row.id_layer,
            row.select_b ?? false,
            row.insert_b ?? false,
            row.update_b ?? false,
            row.delete_b ?? false,
        );
    }

    // ── Read ──────────────────────────────────────────────────────────────

    async findAll(): Promise<any[]> {
        const { sql, params } = LayerPermissionsQueries.findAll();
        return this.pgPool.query(sql, params);
    }

    async findByUserType(idUserType: number): Promise<any[]> {
        const { sql, params } = LayerPermissionsQueries.findByUserType(idUserType);
        return this.pgPool.query(sql, params);
    }

    async findById(id: number): Promise<LayerPermission | null> {
        const row = await this.prisma.role_user_type_layer_view.findUnique({
            where: { id },
        });
        if (!row) return null;
        return this.mapToEntity(row);
    }

    async existsForUserTypeAndLayer(idUserType: number, idLayer: number): Promise<boolean> {
        const row = await this.prisma.role_user_type_layer_view.findFirst({
            where: { id_user_type: idUserType, id_layer: idLayer },
        });
        return !!row;
    }

    async getLayerName(idLayer: number): Promise<string | null> {
        const layer = await this.prisma.layer.findUnique({
            where: { id: idLayer },
            select: { name: true },
        });
        return layer?.name ?? null;
    }

    async getUsernamesByType(idUserType: number): Promise<string[]> {
        const { sql, params } = LayerPermissionsQueries.getUsernamesByType(idUserType);
        const rows = await this.pgPool.query(sql, params);
        return rows.map(r => r.username);
    }

    async getPermissionsByUserType(idUserType: number): Promise<LayerPermission[]> {
        const rows = await this.prisma.role_user_type_layer_view.findMany({
            where: { id_user_type: idUserType },
        });
        return rows.map(r => this.mapToEntity(r));
    }

    // ── Create ────────────────────────────────────────────────────────────

    async create(
        idUserType: number,
        idLayer: number,
        selectB: boolean,
        insertB: boolean,
        updateB: boolean,
        deleteB: boolean,
    ): Promise<number> {
        const row = await this.prisma.role_user_type_layer_view.create({
            data: {
                id_user_type: idUserType,
                id_layer: idLayer,
                select_b: selectB,
                insert_b: insertB,
                update_b: updateB,
                delete_b: deleteB,
            },
        });
        return row.id;
    }

    // ── Update ────────────────────────────────────────────────────────────

    async update(
        id: number,
        selectB: boolean,
        insertB: boolean,
        updateB: boolean,
        deleteB: boolean,
    ): Promise<void> {
        await this.prisma.role_user_type_layer_view.update({
            where: { id },
            data: {
                select_b: selectB,
                insert_b: insertB,
                update_b: updateB,
                delete_b: deleteB,
            },
        });
    }

    // ── Delete ────────────────────────────────────────────────────────────

    async delete(id: number): Promise<void> {
        await this.prisma.role_user_type_layer_view.delete({
            where: { id },
        });
    }
    

    async applyGrants(layerName: string, usernames: string[], privileges: string[]): Promise<void> {
        const privilegeStr = privileges.join(', ');
        for (const username of usernames) {
            const { sql, params } = LayerPermissionsQueries.grantOnTable(
                this.pgPool.quoteIdentifier(layerName),
                privilegeStr,
                this.pgPool.quoteIdentifier(username),
            );
            await this.pgPool.query(sql, params);
        }
    }

    async revokeAll(layerName: string, usernames: string[]): Promise<void> {
        for (const username of usernames) {
            const { sql, params } = LayerPermissionsQueries.revokeAllOnTable(
                this.pgPool.quoteIdentifier(layerName),
                this.pgPool.quoteIdentifier(username),
            );
            await this.pgPool.query(sql, params);
        }
    }
}