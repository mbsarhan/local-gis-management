import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Req,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthGuard }                  from '../../../shared/guards/auth.guard';
import { CreateProjectUseCase }       from '../application/use-cases/create-project.use-case';
import { GetProjectsUseCase }         from '../application/use-cases/get-projects.use-case';
import { StartProjectUseCase }        from '../application/use-cases/start-project.use-case';
import { AssignTechnician1UseCase }   from '../application/use-cases/assign-technician-1.use-case';
import { Technician1StartUseCase }    from '../application/use-cases/technician-1-start.use-case';
import { Technician1ConfirmUseCase }  from '../application/use-cases/technician-1-confirm.use-case';
import { AssignTechnician2UseCase }   from '../application/use-cases/assign-technician-2.use-case';
import { Technician2StartUseCase }    from '../application/use-cases/technician-2-start.use-case';
import { Technician2ConfirmUseCase }  from '../application/use-cases/technician-2-confirm.use-case';
import { ReturnToTechnician1UseCase } from '../application/use-cases/return-to-technician-1.use-case';
import { ManagerConfirmUseCase }      from '../application/use-cases/manager-confirm.use-case';
import { CreateProjectDto, AssignTechnician1Dto, AssignTechnician2Dto } from './dto/projects.dto';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
    constructor(
        private readonly createProjectUseCase:       CreateProjectUseCase,
        private readonly getProjectsUseCase:         GetProjectsUseCase,
        private readonly startProjectUseCase:        StartProjectUseCase,
        private readonly assignTechnician1UseCase:   AssignTechnician1UseCase,
        private readonly technician1StartUseCase:    Technician1StartUseCase,
        private readonly technician1ConfirmUseCase:  Technician1ConfirmUseCase,
        private readonly assignTechnician2UseCase:   AssignTechnician2UseCase,
        private readonly technician2StartUseCase:    Technician2StartUseCase,
        private readonly technician2ConfirmUseCase:  Technician2ConfirmUseCase,
        private readonly returnToTechnician1UseCase: ReturnToTechnician1UseCase,
        private readonly managerConfirmUseCase:      ManagerConfirmUseCase,
    ) {}

    // GET /api/projects
    @Get()
    async getProjects() {
        return this.getProjectsUseCase.execute();
    }

    // POST /api/projects
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProject(@Req() req: any, @Body() dto: CreateProjectDto) {
        return this.createProjectUseCase.execute(
            req.userId,
            dto.id_project_manager,
            dto.id_plan_boundary,
            dto.id_layer,
        );
    }

    // PATCH /api/projects/:id/start
    @Patch(':id/start')
    async startProject(@Req() req: any, @Param('id') id: number) {
        return this.startProjectUseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/assign-technician-1
    @Patch(':id/assign-technician-1')
    async assignTechnician1(@Req() req: any, @Param('id') id: number, @Body() dto: AssignTechnician1Dto) {
        return this.assignTechnician1UseCase.execute(req.userId, id, dto.id_drawer_1);
    }

    // PATCH /api/projects/:id/technician-1-start
    @Patch(':id/technician-1-start')
    async technician1Start(@Req() req: any, @Param('id') id: number) {
        return this.technician1StartUseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/technician-1-confirm
    @Patch(':id/technician-1-confirm')
    async technician1Confirm(@Req() req: any, @Param('id') id: number) {
        return this.technician1ConfirmUseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/assign-technician-2
    @Patch(':id/assign-technician-2')
    async assignTechnician2(@Req() req: any, @Param('id') id: number, @Body() dto: AssignTechnician2Dto) {
        return this.assignTechnician2UseCase.execute(req.userId, id, dto.id_drawer_2);
    }

    // PATCH /api/projects/:id/technician-2-start
    @Patch(':id/technician-2-start')
    async technician2Start(@Req() req: any, @Param('id') id: number) {
        return this.technician2StartUseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/technician-2-confirm
    @Patch(':id/technician-2-confirm')
    async technician2Confirm(@Req() req: any, @Param('id') id: number) {
        return this.technician2ConfirmUseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/return-to-technician-1
    @Patch(':id/return-to-technician-1')
    async returnToTechnician1(@Req() req: any, @Param('id') id: number) {
        return this.returnToTechnician1UseCase.execute(req.userId, id);
    }

    // PATCH /api/projects/:id/manager-confirm
    @Patch(':id/manager-confirm')
    async managerConfirm(@Req() req: any, @Param('id') id: number) {
        return this.managerConfirmUseCase.execute(req.userId, id);
    }
}