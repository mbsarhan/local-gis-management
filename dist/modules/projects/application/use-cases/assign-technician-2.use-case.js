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
exports.AssignTechnician2UseCase = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_interface_1 = require("../../domain/repositories/projects.repository.interface");
let AssignTechnician2UseCase = class AssignTechnician2UseCase {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async execute(userId, projectId, idDrawer2) {
        const project = await this.projectsRepository.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (!project.isAssignedManager(userId))
            throw new common_1.ForbiddenException('Only the assigned project manager can assign technician 2');
        if (!project.canAssignTechnician2())
            throw new common_1.BadRequestException(`Project must be in status TECHNICIAN_1_CONFIRMED (6) to assign technician 2. Current status: ${project.idProjectStatus}`);
        const hasPrivilege = await this.projectsRepository.hasPrivilege(idDrawer2, project.idPlanBoundary);
        if (!hasPrivilege) {
            await this.projectsRepository.grantPrivilege(idDrawer2, project.idPlanBoundary, userId);
        }
        await this.projectsRepository.assignTechnician2(projectId, idDrawer2, new Date());
        return { id: projectId };
    }
};
exports.AssignTechnician2UseCase = AssignTechnician2UseCase;
exports.AssignTechnician2UseCase = AssignTechnician2UseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(projects_repository_interface_1.PROJECTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AssignTechnician2UseCase);
//# sourceMappingURL=assign-technician-2.use-case.js.map