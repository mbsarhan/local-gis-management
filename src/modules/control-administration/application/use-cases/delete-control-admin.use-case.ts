import { Injectable, NotFoundException } from '@nestjs/common';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';

@Injectable()
export class DeleteControlUseCase {
  constructor(
    private readonly controlRepository: IControlAdministrationRepository,
  ) {}

  async execute(id: number): Promise<boolean> {
    const existing = await this.controlRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`الضابطة غير موجودة لحذفها`);
    }

    return await this.controlRepository.delete(id);
  }
}