import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { PgPoolService } from '../../../../shared/database/pg-pool.service';
import { IPrivilegesRepository } from '../../domain/repositories/privileges.repository.interface';
import { Privilege } from '../../domain/entities/privilege.entity';
import { PrivilegesQueries } from './privileges.queries';

@Injectable()
export class PrivilegesPrismaRepository implements IPrivilegesRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly pgPool: PgPoolService,
    ) {}

    // ── Helpers ───────────────────────────────────────────────────────────

    private mapToEntity(row: any): Privilege {
        return new Privilege(
            row.id,
            row.id_user,
            row.id_governorate,
            row.id_township,
            row.id_community,
            row.id_plan_boundary,
            row.privilege_code,
            row.id_who,
        );
    }

    // ── Read ──────────────────────────────────────────────────────────────

    async findAll(): Promise<any[]> {
        const { sql, params } = PrivilegesQueries.findAll();
        return this.pgPool.query(sql, params);
    }

    async findByUser(userId: number): Promise<Privilege[]> {
        const { sql, params } = PrivilegesQueries.findByUser(userId);
        const rows = await this.pgPool.query(sql, params);
        return rows.map(row => this.mapToEntity(row));
    }

    async findById(id: number): Promise<Privilege | null> {
        const row = await this.prisma.user_privilege.findUnique({
            where: { id },
        });
        if (!row) return null;
        return this.mapToEntity(row);
    }

    async getUserPrivileges(userId: number): Promise<Privilege[]> {
        return this.findByUser(userId);
    }

    // ── Create ────────────────────────────────────────────────────────────

    async create(
        idWho: number,
        idUser: number,
        idGovernorate: number,
        privilegeCode: string,
        idTownship?: number,
        idCommunity?: number,
        idPlanBoundary?: number,
    ): Promise<number> {
        const row = await this.prisma.user_privilege.create({
            data: {
                id_user:          idUser,
                id_governorate:   idGovernorate,
                id_township:      idTownship      ?? null,
                id_community:     idCommunity     ?? null,
                id_plan_boundary: idPlanBoundary  ?? null,
                privilege_code:   privilegeCode,
                id_who:           idWho,
            },
        });
        return row.id;
    }

    // ── Delete ────────────────────────────────────────────────────────────

    async delete(id: number): Promise<void> {
        await this.prisma.user_privilege.delete({
            where: { id },
        });
    }
}