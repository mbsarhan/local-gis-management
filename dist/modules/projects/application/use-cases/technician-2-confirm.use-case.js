"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Technician2ConfirmUseCase = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_interface_1 = require("../../domain/repositories/projects.repository.interface");
let Technician2ConfirmUseCase = class Technician2ConfirmUseCase {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async execute(userId, projectId) {
        const project = await this.projectsRepository.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (!project.isAssignedDrawer2(userId))
            throw new common_1.ForbiddenException('Only the assigned technician 2 can confirm this work');
        if (!project.canTechnician2Confirm())
            throw new common_1.BadRequestException(`Project must be in status TECHNICIAN_2_WORKING (8) to confirm. Current status: ${project.idProjectStatus}`);
        await this.projectsRepository.technician2Confirm(projectId, new Date());
        const hasOtherProjects = await this.projectsRepository.hasOtherActiveProjects(userId, project.idPlanBoundary, projectId);
        if (!hasOtherProjects) {
            await this.projectsRepository.revokePrivilege(userId, project.idPlanBoundary);
        }
        return { id: projectId };
    }
};
exports.Technician2ConfirmUseCase = Technician2ConfirmUseCase;
exports.Technician2ConfirmUseCase = Technician2ConfirmUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(projects_repository_interface_1.PROJECTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], Technician2ConfirmUseCase);
//# sourceMappingURL=technician-2-confirm.use-case.js.map