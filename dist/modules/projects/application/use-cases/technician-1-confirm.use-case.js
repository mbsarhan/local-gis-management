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
exports.Technician1ConfirmUseCase = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_interface_1 = require("../../domain/repositories/projects.repository.interface");
let Technician1ConfirmUseCase = class Technician1ConfirmUseCase {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async execute(userId, projectId) {
        const project = await this.projectsRepository.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (!project.isAssignedDrawer1(userId))
            throw new common_1.ForbiddenException('Only the assigned technician 1 can confirm this work');
        if (!project.canTechnician1Confirm())
            throw new common_1.BadRequestException(`Project must be in status TECHNICIAN_1_WORKING (5) to confirm. Current status: ${project.idProjectStatus}`);
        await this.projectsRepository.technician1Confirm(projectId, new Date());
        const hasOtherProjects = await this.projectsRepository.hasOtherActiveProjects(userId, project.idPlanBoundary, projectId);
        if (!hasOtherProjects) {
            await this.projectsRepository.revokePrivilege(userId, project.idPlanBoundary);
        }
        return { id: projectId };
    }
};
exports.Technician1ConfirmUseCase = Technician1ConfirmUseCase;
exports.Technician1ConfirmUseCase = Technician1ConfirmUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(projects_repository_interface_1.PROJECTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], Technician1ConfirmUseCase);
//# sourceMappingURL=technician-1-confirm.use-case.js.map