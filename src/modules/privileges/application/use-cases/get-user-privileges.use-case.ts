import { Injectable, Inject } from '@nestjs/common';
import { IPrivilegesRepository, PRIVILEGES_REPOSITORY } from '../../domain/repositories/privileges.repository.interface';

@Injectable()
export class GetUserPrivilegesUseCase {
    constructor(
        @Inject(PRIVILEGES_REPOSITORY)
        private readonly privilegesRepository: IPrivilegesRepository,
    ) {}

    async execute(userId: number) {
        return this.privilegesRepository.findByUser(userId);
    }
}