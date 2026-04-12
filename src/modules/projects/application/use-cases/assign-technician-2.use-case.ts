import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IProjectsRepository, PROJECTS_REPOSITORY } from '../../domain/repositories/projects.repository.interface';

@Injectable()
export class AssignTechnician2UseCase {
    constructor(
        @Inject(PROJECTS_REPOSITORY)
        private readonly projectsRepository: IProjectsRepository,
    ) {}

    async execute(userId: number, projectId: number, idDrawer2: number) {
        const project = await this.projectsRepository.findById(projectId);

        if (!project) throw new NotFoundException('Project not found');

        if (!project.isAssignedManager(userId))
            throw new ForbiddenException('Only the assigned project manager can assign technician 2');

        if (!project.canAssignTechnician2())
            throw new BadRequestException(`Project must be in status TECHNICIAN_1_CONFIRMED (6) to assign technician 2. Current status: ${project.idProjectStatus}`);

        const hasPrivilege = await this.projectsRepository.hasPrivilege(idDrawer2, project.idPlanBoundary);
        if (!hasPrivilege) {
            await this.projectsRepository.grantPrivilege(idDrawer2, project.idPlanBoundary, userId);
        }

        await this.projectsRepository.assignTechnician2(projectId, idDrawer2, new Date());

        return { id: projectId };
    }
}