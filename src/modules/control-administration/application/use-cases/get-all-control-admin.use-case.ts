import { Injectable } from '@nestjs/common';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';

@Injectable()
export class GetAllControlsUseCase {
  constructor(
    private readonly controlRepository: IControlAdministrationRepository,
  ) {}

  async execute(): Promise<ControlAdministrationEntity[]> {
    // جلب كافة الضوابط (التي ستكون محملة ببيانات المجتمع والوحدات تلقائياً من الـ Repository)
    return await this.controlRepository.findAll();
  }
}