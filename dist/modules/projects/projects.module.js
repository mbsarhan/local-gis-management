"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const projects_controller_1 = require("./presentation/projects.controller");
const projects_prisma_repository_1 = require("./infrastructure/prisma/projects.prisma.repository");
const projects_repository_interface_1 = require("./domain/repositories/projects.repository.interface");
const auth_guard_1 = require("../../shared/guards/auth.guard");
const token_service_1 = require("../../shared/services/token.service");
const config_service_1 = require("../../shared/config/config.service");
const create_project_use_case_1 = require("./application/use-cases/create-project.use-case");
const get_projects_use_case_1 = require("./application/use-cases/get-projects.use-case");
const start_project_use_case_1 = require("./application/use-cases/start-project.use-case");
const assign_technician_1_use_case_1 = require("./application/use-cases/assign-technician-1.use-case");
const technician_1_start_use_case_1 = require("./application/use-cases/technician-1-start.use-case");
const technician_1_confirm_use_case_1 = require("./application/use-cases/technician-1-confirm.use-case");
const assign_technician_2_use_case_1 = require("./application/use-cases/assign-technician-2.use-case");
const technician_2_start_use_case_1 = require("./application/use-cases/technician-2-start.use-case");
const technician_2_confirm_use_case_1 = require("./application/use-cases/technician-2-confirm.use-case");
const return_to_technician_1_use_case_1 = require("./application/use-cases/return-to-technician-1.use-case");
const manager_confirm_use_case_1 = require("./application/use-cases/manager-confirm.use-case");
const useCases = [
    create_project_use_case_1.CreateProjectUseCase,
    get_projects_use_case_1.GetProjectsUseCase,
    start_project_use_case_1.StartProjectUseCase,
    assign_technician_1_use_case_1.AssignTechnician1UseCase,
    technician_1_start_use_case_1.Technician1StartUseCase,
    technician_1_confirm_use_case_1.Technician1ConfirmUseCase,
    assign_technician_2_use_case_1.AssignTechnician2UseCase,
    technician_2_start_use_case_1.Technician2StartUseCase,
    technician_2_confirm_use_case_1.Technician2ConfirmUseCase,
    return_to_technician_1_use_case_1.ReturnToTechnician1UseCase,
    manager_confirm_use_case_1.ManagerConfirmUseCase,
];
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        controllers: [projects_controller_1.ProjectsController],
        providers: [
            {
                provide: projects_repository_interface_1.PROJECTS_REPOSITORY,
                useClass: projects_prisma_repository_1.ProjectsPrismaRepository,
            },
            auth_guard_1.AuthGuard,
            token_service_1.TokenService,
            config_service_1.ConfigService,
            ...useCases,
        ],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map