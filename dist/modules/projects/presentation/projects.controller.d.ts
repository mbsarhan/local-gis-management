import { CreateProjectUseCase } from '../application/use-cases/create-project.use-case';
import { GetProjectsUseCase } from '../application/use-cases/get-projects.use-case';
import { StartProjectUseCase } from '../application/use-cases/start-project.use-case';
import { AssignTechnician1UseCase } from '../application/use-cases/assign-technician-1.use-case';
import { Technician1StartUseCase } from '../application/use-cases/technician-1-start.use-case';
import { Technician1ConfirmUseCase } from '../application/use-cases/technician-1-confirm.use-case';
import { AssignTechnician2UseCase } from '../application/use-cases/assign-technician-2.use-case';
import { Technician2StartUseCase } from '../application/use-cases/technician-2-start.use-case';
import { Technician2ConfirmUseCase } from '../application/use-cases/technician-2-confirm.use-case';
import { ReturnToTechnician1UseCase } from '../application/use-cases/return-to-technician-1.use-case';
import { ManagerConfirmUseCase } from '../application/use-cases/manager-confirm.use-case';
import { CreateProjectDto, AssignTechnician1Dto, AssignTechnician2Dto } from './dto/projects.dto';
export declare class ProjectsController {
    private readonly createProjectUseCase;
    private readonly getProjectsUseCase;
    private readonly startProjectUseCase;
    private readonly assignTechnician1UseCase;
    private readonly technician1StartUseCase;
    private readonly technician1ConfirmUseCase;
    private readonly assignTechnician2UseCase;
    private readonly technician2StartUseCase;
    private readonly technician2ConfirmUseCase;
    private readonly returnToTechnician1UseCase;
    private readonly managerConfirmUseCase;
    constructor(createProjectUseCase: CreateProjectUseCase, getProjectsUseCase: GetProjectsUseCase, startProjectUseCase: StartProjectUseCase, assignTechnician1UseCase: AssignTechnician1UseCase, technician1StartUseCase: Technician1StartUseCase, technician1ConfirmUseCase: Technician1ConfirmUseCase, assignTechnician2UseCase: AssignTechnician2UseCase, technician2StartUseCase: Technician2StartUseCase, technician2ConfirmUseCase: Technician2ConfirmUseCase, returnToTechnician1UseCase: ReturnToTechnician1UseCase, managerConfirmUseCase: ManagerConfirmUseCase);
    getProjects(): Promise<any>;
    createProject(req: any, dto: CreateProjectDto): Promise<{
        id: number;
    }>;
    startProject(req: any, id: number): Promise<any>;
    assignTechnician1(req: any, id: number, dto: AssignTechnician1Dto): Promise<any>;
    technician1Start(req: any, id: number): Promise<any>;
    technician1Confirm(req: any, id: number): Promise<any>;
    assignTechnician2(req: any, id: number, dto: AssignTechnician2Dto): Promise<any>;
    technician2Start(req: any, id: number): Promise<any>;
    technician2Confirm(req: any, id: number): Promise<any>;
    returnToTechnician1(req: any, id: number): Promise<any>;
    managerConfirm(req: any, id: number): Promise<any>;
}
