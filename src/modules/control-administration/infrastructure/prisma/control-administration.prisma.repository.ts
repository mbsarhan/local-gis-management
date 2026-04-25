import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';
import { ControlAdministrationMapper } from '../mappers/control-administration.mapper';

@Injectable()
export class ControlAdministrationPrismaRepository implements IControlAdministrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly controlInclude = {
    type_regulatory_area: true,
    community: {
      include: {
        community_unit: true, 
      },
    },
  };

  async create(data: ControlAdministrationEntity): Promise<ControlAdministrationEntity> {
    const raw = ControlAdministrationMapper.toPersistence(data);
    const created = await this.prisma.control_administration.create({
      data: raw as any,
      include: this.controlInclude, 
    });
    return ControlAdministrationMapper.toDomain(created);
  }

  async findAll(): Promise<ControlAdministrationEntity[]> {
    const results = await this.prisma.control_administration.findMany({
      include: this.controlInclude,
      orderBy: { id: 'asc' },
    });
    return results.map(result => ControlAdministrationMapper.toDomain(result));
  }

  async findByCommunity(communityId: number): Promise<ControlAdministrationEntity[]> {
    const results = await this.prisma.control_administration.findMany({
      where: { id_community: communityId },
      include: this.controlInclude,
      orderBy: { id: 'asc' },
    });
    return results.map(result => ControlAdministrationMapper.toDomain(result));
  }

  async findById(id: number): Promise<ControlAdministrationEntity | null> {
    const result = await this.prisma.control_administration.findUnique({
      where: { id },
      include: this.controlInclude,
    });
    return result ? ControlAdministrationMapper.toDomain(result) : null;
  }

  async update(id: number, data: Partial<ControlAdministrationEntity>): Promise<ControlAdministrationEntity> {
    const raw = ControlAdministrationMapper.toPersistence(data as ControlAdministrationEntity);
    const updated = await this.prisma.control_administration.update({
      where: { id },
      data: raw as any,
      include: this.controlInclude,
    });
    return ControlAdministrationMapper.toDomain(updated);
  }

  async delete(id: number): Promise<boolean> {
    await this.prisma.control_administration.delete({ where: { id } });
    return true;
  }
}
