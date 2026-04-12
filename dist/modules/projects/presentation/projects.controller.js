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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../../shared/guards/auth.guard");
const create_project_use_case_1 = require("../application/use-cases/create-project.use-case");
const get_projects_use_case_1 = require("../application/use-cases/get-projects.use-case");
const start_project_use_case_1 = require("../application/use-cases/start-project.use-case");
const assign_technician_1_use_case_1 = require("../application/use-cases/assign-technician-1.use-case");
const technician_1_start_use_case_1 = require("../application/use-cases/technician-1-start.use-case");
const technician_1_confirm_use_case_1 = require("../application/use-cases/technician-1-confirm.use-case");
const assign_technician_2_use_case_1 = require("../application/use-cases/assign-technician-2.use-case");
const technician_2_start_use_case_1 = require("../application/use-cases/technician-2-start.use-case");
const technician_2_confirm_use_case_1 = require("../application/use-cases/technician-2-confirm.use-case");
const return_to_technician_1_use_case_1 = require("../application/use-cases/return-to-technician-1.use-case");
const manager_confirm_use_case_1 = require("../application/use-cases/manager-confirm.use-case");
const projects_dto_1 = require("./dto/projects.dto");
let ProjectsController = class ProjectsController {
    constructor(createProjectUseCase, getProjectsUseCase, startProjectUseCase, assignTechnician1UseCase, technician1StartUseCase, technician1ConfirmUseCase, assignTechnician2UseCase, technician2StartUseCase, technician2ConfirmUseCase, returnToTechnician1UseCase, managerConfirmUseCase) {
        this.createProjectUseCase = createProjectUseCase;
        this.getProjectsUseCase = getProjectsUseCase;
        this.startProjectUseCase = startProjectUseCase;
        this.assignTechnician1UseCase = assignTechnician1UseCase;
        this.technician1StartUseCase = technician1StartUseCase;
        this.technician1ConfirmUseCase = technician1ConfirmUseCase;
        this.assignTechnician2UseCase = assignTechnician2UseCase;
        this.technician2StartUseCase = technician2StartUseCase;
        this.technician2ConfirmUseCase = technician2ConfirmUseCase;
        this.returnToTechnician1UseCase = returnToTechnician1UseCase;
        this.managerConfirmUseCase = managerConfirmUseCase;
    }
    async getProjects() {
        return this.getProjectsUseCase.execute();
    }
    async createProject(req, dto) {
        return this.createProjectUseCase.execute(req.userId, dto.id_project_manager, dto.id_plan_boundary, dto.id_layer);
    }
    async startProject(req, id) {
        return this.startProjectUseCase.execute(req.userId, id);
    }
    async assignTechnician1(req, id, dto) {
        return this.assignTechnician1UseCase.execute(req.userId, id, dto.id_drawer_1);
    }
    async technician1Start(req, id) {
        return this.technician1StartUseCase.execute(req.userId, id);
    }
    async technician1Confirm(req, id) {
        return this.technician1ConfirmUseCase.execute(req.userId, id);
    }
    async assignTechnician2(req, id, dto) {
        return this.assignTechnician2UseCase.execute(req.userId, id, dto.id_drawer_2);
    }
    async technician2Start(req, id) {
        return this.technician2StartUseCase.execute(req.userId, id);
    }
    async technician2Confirm(req, id) {
        return this.technician2ConfirmUseCase.execute(req.userId, id);
    }
    async returnToTechnician1(req, id) {
        return this.returnToTechnician1UseCase.execute(req.userId, id);
    }
    async managerConfirm(req, id) {
        return this.managerConfirmUseCase.execute(req.userId, id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, projects_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "startProject", null);
__decorate([
    (0, common_1.Patch)(':id/assign-technician-1'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, projects_dto_1.AssignTechnician1Dto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "assignTechnician1", null);
__decorate([
    (0, common_1.Patch)(':id/technician-1-start'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "technician1Start", null);
__decorate([
    (0, common_1.Patch)(':id/technician-1-confirm'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "technician1Confirm", null);
__decorate([
    (0, common_1.Patch)(':id/assign-technician-2'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, projects_dto_1.AssignTechnician2Dto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "assignTechnician2", null);
__decorate([
    (0, common_1.Patch)(':id/technician-2-start'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "technician2Start", null);
__decorate([
    (0, common_1.Patch)(':id/technician-2-confirm'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "technician2Confirm", null);
__decorate([
    (0, common_1.Patch)(':id/return-to-technician-1'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "returnToTechnician1", null);
__decorate([
    (0, common_1.Patch)(':id/manager-confirm'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "managerConfirm", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [create_project_use_case_1.CreateProjectUseCase, typeof (_a = typeof get_projects_use_case_1.GetProjectsUseCase !== "undefined" && get_projects_use_case_1.GetProjectsUseCase) === "function" ? _a : Object, typeof (_b = typeof start_project_use_case_1.StartProjectUseCase !== "undefined" && start_project_use_case_1.StartProjectUseCase) === "function" ? _b : Object, typeof (_c = typeof assign_technician_1_use_case_1.AssignTechnician1UseCase !== "undefined" && assign_technician_1_use_case_1.AssignTechnician1UseCase) === "function" ? _c : Object, typeof (_d = typeof technician_1_start_use_case_1.Technician1StartUseCase !== "undefined" && technician_1_start_use_case_1.Technician1StartUseCase) === "function" ? _d : Object, typeof (_e = typeof technician_1_confirm_use_case_1.Technician1ConfirmUseCase !== "undefined" && technician_1_confirm_use_case_1.Technician1ConfirmUseCase) === "function" ? _e : Object, typeof (_f = typeof assign_technician_2_use_case_1.AssignTechnician2UseCase !== "undefined" && assign_technician_2_use_case_1.AssignTechnician2UseCase) === "function" ? _f : Object, typeof (_g = typeof technician_2_start_use_case_1.Technician2StartUseCase !== "undefined" && technician_2_start_use_case_1.Technician2StartUseCase) === "function" ? _g : Object, typeof (_h = typeof technician_2_confirm_use_case_1.Technician2ConfirmUseCase !== "undefined" && technician_2_confirm_use_case_1.Technician2ConfirmUseCase) === "function" ? _h : Object, typeof (_j = typeof return_to_technician_1_use_case_1.ReturnToTechnician1UseCase !== "undefined" && return_to_technician_1_use_case_1.ReturnToTechnician1UseCase) === "function" ? _j : Object, typeof (_k = typeof manager_confirm_use_case_1.ManagerConfirmUseCase !== "undefined" && manager_confirm_use_case_1.ManagerConfirmUseCase) === "function" ? _k : Object])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map