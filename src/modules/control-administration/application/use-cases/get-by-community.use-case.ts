import { Injectable, NotFoundException } from '@nestjs/common';
import { IControlAdministrationRepository } from '../../domain/repositories/control-administration.repository.interface';
import { ControlAdministrationEntity } from '../../domain/entities/control-administration.entity';

@Injectable()
export class GetByCommunityUseCase {
  constructor(
    private readonly controlRepository: IControlAdministrationRepository,
  ) {}

  async execute(communityId: number): Promise<ControlAdministrationEntity[]> {

    const results = await this.controlRepository.findByCommunity(communityId);

   
    /*
    if (!results || results.length === 0) {
      throw new NotFoundException(`لا توجد ضوابط إدارية مسجلة للمجتمع رقم ${communityId}`);
    }
    */

    return results;
  }
}