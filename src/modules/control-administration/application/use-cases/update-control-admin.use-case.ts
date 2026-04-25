import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';

@Injectable()
export class UpdateControlUseCase {
  constructor(
    private readonly controlRepository: IControlAdministrationRepository,
  ) {}

  async execute(idWho: number, id: number, data: any) {
    const existing = await this.controlRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`الضابطة ذات الرقم ${id} غير موجودة`);
    }

    const entity = new ControlAdministrationEntity(
      id,
      data.id_community ?? existing.id_community,
      data.id_type_regulatory_area ?? existing.id_type_regulatory_area,
      data.minimum_property_area ?? existing.minimum_property_area,
      data.maximum_property_area ?? existing.maximum_property_area,
      data.construction_ratio ?? existing.construction_ratio,
      data.minimum_interface ?? existing.minimum_interface,
      data.number_of_floors ?? existing.number_of_floors,
      data.height ?? existing.height,
      data.front_duties ?? existing.front_duties,
      data.back_duties ?? existing.back_duties,
      data.side_duties ?? existing.side_duties,
      data.notes ?? existing.notes,
      idWho,
      data.height_of_ground_floors ?? existing.height_of_ground_floors,
      data.investment_factor ?? existing.investment_factor,
    );

    const validation = entity.validate();
    if (!validation.isValid) {
      throw new BadRequestException(validation.message);
    }

    return await this.controlRepository.update(id, entity);
  }
}
