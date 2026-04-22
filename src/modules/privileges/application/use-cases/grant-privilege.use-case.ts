import { Injectable, Inject, BadRequestException, ForbiddenException } from '@nestjs/common';
import { IPrivilegesRepository, PRIVILEGES_REPOSITORY } from '../../domain/repositories/privileges.repository.interface';
import { Privilege } from '../../domain/entities/privilege.entity';
import { UserTypes } from '../../../../shared/constants/user-types.constant';

@Injectable()
export class GrantPrivilegeUseCase {
    constructor(
        @Inject(PRIVILEGES_REPOSITORY)
        private readonly privilegesRepository: IPrivilegesRepository,
    ) {}

    async execute(
        callerId: number,
        callerType: number,
        idUser: number,
        idGovernorate: number,
        idTownship?: number,
        idCommunity?: number,
        idPlanBoundary?: number,
    ) {
        const newCode = Privilege.buildCode(idGovernorate, idTownship, idCommunity, idPlanBoundary);

        if (callerType === UserTypes.PROJECT_MANAGER) {
            const callerPrivileges = await this.privilegesRepository.getUserPrivileges(callerId);

            const callerCoversNewCode = callerPrivileges.some(p => p.covers(newCode) || p.privilegeCode === newCode);
            if (!callerCoversNewCode) {
                throw new ForbiddenException('You can only grant privileges within your own geographic scope');
            }
        }

        const existingPrivileges = await this.privilegesRepository.getUserPrivileges(idUser);

        const coveredByExisting = existingPrivileges.find(p => p.covers(newCode));
        if (coveredByExisting) {
            throw new BadRequestException(
                `User already has a broader privilege (${coveredByExisting.privilegeCode}) that covers this one`
            );
        }

        const madeRedundant = existingPrivileges.filter(p => p.isCoveredBy(newCode));
        if (madeRedundant.length > 0) {
            const codes = madeRedundant.map(p => p.privilegeCode).join(', ');
            throw new BadRequestException(
                `The new privilege (${newCode}) would make existing privileges redundant: ${codes}. Revoke them first.`
            );
        }

        const id = await this.privilegesRepository.create(
            callerId,
            idUser,
            idGovernorate,
            newCode,
            idTownship,
            idCommunity,
            idPlanBoundary,
        );

        return { id };
    }
}