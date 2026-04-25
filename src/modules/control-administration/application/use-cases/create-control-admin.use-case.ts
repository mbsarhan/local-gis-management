import { BadRequestException, Injectable } from '@nestjs/common';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';

@Injectable()
export class CreateControlUseCase {
  constructor(
    private readonly controlRepository: IControlAdministrationRepository,
  ) {}

  async execute(idWho: number, data: any): Promise<ControlAdministrationEntity> {
    const entity = new ControlAdministrationEntity(
      null,
      data.id_community,
      data.id_type_regulatory_area,
      data.minimum_property_area,
      data.maximum_property_area,
      data.construction_ratio,
      data.minimum_interface,
      data.number_of_floors,
      data.height,
      data.front_duties,
      data.back_duties,
      data.side_duties,
      data.notes,
      idWho,
      data.height_of_ground_floors,
      data.investment_factor
    );

    const validation = entity.validate();
    if (!validation.isValid) {
      throw new BadRequestException(validation.message);
    }

    return await this.controlRepository.create(entity);
  }
}
