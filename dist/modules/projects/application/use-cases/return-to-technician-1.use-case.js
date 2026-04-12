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
exports.ReturnToTechnician1UseCase = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_interface_1 = require("../../domain/repositories/projects.repository.interface");
let ReturnToTechnician1UseCase = class ReturnToTechnician1UseCase {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async execute(userId, projectId) {
        const project = await this.projectsRepository.findById(projectId);
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        if (!project.isAssignedManager(userId))
            throw new common_1.ForbiddenException('Only the assigned project manager can return the project to technician 1');
        if (!project.canReturnToTechnician1())
            throw new common_1.BadRequestException(`Project must be in status TECHNICIAN_2_CONFIRMED (9) to return to technician 1. Current status: ${project.idProjectStatus}`);
        await this.projectsRepository.returnToTechnician1(projectId);
        return { id: projectId };
    }
};
exports.ReturnToTechnician1UseCase = ReturnToTechnician1UseCase;
exports.ReturnToTechnician1UseCase = ReturnToTechnician1UseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(projects_repository_interface_1.PROJECTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ReturnToTechnician1UseCase);
//# sourceMappingURL=return-to-technician-1.use-case.js.map