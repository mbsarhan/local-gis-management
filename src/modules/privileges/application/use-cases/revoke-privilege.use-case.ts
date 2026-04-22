import { Injectable, Inject, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IPrivilegesRepository, PRIVILEGES_REPOSITORY } from '../../domain/repositories/privileges.repository.interface';
import { UserTypes } from '../../../../shared/constants/user-types.constant';

@Injectable()
export class RevokePrivilegeUseCase {
    constructor(
        @Inject(PRIVILEGES_REPOSITORY)
        private readonly privilegesRepository: IPrivilegesRepository,
    ) {}

    async execute(callerId: number, callerType: number, privilegeId: number) {
        const privilege = await this.privilegesRepository.findById(privilegeId);

        if (!privilege) {
            throw new NotFoundException('Privilege not found');
        }

        if (callerType === UserTypes.PROJECT_MANAGER) {
            const callerPrivileges = await this.privilegesRepository.getUserPrivileges(callerId);

            const callerCovers = callerPrivileges.some(p => p.covers(privilege.privilegeCode) || p.privilegeCode === privilege.privilegeCode);
            if (!callerCovers) {
                throw new ForbiddenException('You can only revoke privileges within your own geographic scope');
            }
        }

        await this.privilegesRepository.delete(privilegeId);

        return { id: privilegeId };
    }
}