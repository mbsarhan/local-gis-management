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
    ) {}

    private mapToEntity(row: any): LayerPermission {
        return new LayerPermission(
            row.id,
            row.id_user,
            row.id_layer,
            row.select_b ?? false,
            row.insert_b ?? false,
            row.update_b ?? false,
            row.delete_b ?? false,
        );
    }

    async findAll(): Promise<any[]> {
        const { sql, params } = LayerPermissionsQueries.findAll();
        return this.pgPool.query(sql, params);
    }

    async findByUser(idUser: number): Promise<any[]> {
        const { sql, params } = LayerPermissionsQueries.findByUser(idUser);
        return this.pgPool.query(sql, params);
    }

    async findById(id: number): Promise<LayerPermission | null> {
        const row = await this.prisma.role_user_type_layer_view.findUnique({
            where: { id },
        });
        if (!row) return null;
        return this.mapToEntity(row);
    }

    async existsForUserAndLayer(idUser: number, idLayer: number): Promise<boolean> {
        const row = await this.prisma.role_user_type_layer_view.findFirst({
            where: { id_user: idUser, id_layer: idLayer },
        });
        return !!row;
    }

    async getLayerName(idLayer: number): Promise<string | null> {
        const layer = await this.prisma.layer.findUnique({
            where:  { id: idLayer },
            select: { name: true },
        });
        return layer?.name ?? null;
    }

    async getUsernameById(idUser: number): Promise<string | null> {
        const { sql, params } = LayerPermissionsQueries.getUsernameById(idUser);
        const rows = await this.pgPool.query(sql, params);
        return rows[0]?.username ?? null;
    }

    async create(
        idUser: number,
        idLayer: number,
        selectB: boolean,
        insertB: boolean,
        updateB: boolean,
        deleteB: boolean,
    ): Promise<number> {
        const row = await this.prisma.role_user_type_layer_view.create({
            data: {
                id_user:  idUser,
                id_layer: idLayer,
                select_b: selectB,
                insert_b: insertB,
                update_b: updateB,
                delete_b: deleteB,
            },
        });
        return row.id;
    }

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

    async delete(id: number): Promise<void> {
        await this.prisma.role_user_type_layer_view.delete({
            where: { id },
        });
    }

    async applyGrants(layerName: string, username: string, privileges: string[]): Promise<void> {
        const { sql, params } = LayerPermissionsQueries.grantOnTable(
            this.pgPool.quoteIdentifier(layerName),
            privileges.join(', '),
            this.pgPool.quoteIdentifier(username),
        );
        await this.pgPool.query(sql, params);
    }

    async revokeAll(layerName: string, username: string): Promise<void> {
        const { sql, params } = LayerPermissionsQueries.revokeAllOnTable(
            this.pgPool.quoteIdentifier(layerName),
            this.pgPool.quoteIdentifier(username),
        );
        await this.pgPool.query(sql, params);
    }
}