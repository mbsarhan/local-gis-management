import { Project } from '../entities/project.entity';
export interface IProjectsRepository {
    findAll(): Promise<any[]>;
    findById(id: number): Promise<Project | null>;
    createProject(idWho: number, idProjectManager: number, idPlanBoundary: number, idLayer: number): Promise<number>;
    startProject(id: number, startDate: Date): Promise<void>;
    assignTechnician1(id: number, idDrawer1: number, assignmentDate: Date): Promise<void>;
    technician1Start(id: number, startDate: Date): Promise<void>;
    technician1Confirm(id: number, endDate: Date): Promise<void>;
    assignTechnician2(id: number, idDrawer2: number, assignmentDate: Date): Promise<void>;
    technician2Start(id: number, startDate: Date): Promise<void>;
    technician2Confirm(id: number, endDate: Date): Promise<void>;
    returnToTechnician1(id: number): Promise<void>;
    managerConfirm(id: number, endDate: Date): Promise<void>;
    hasPrivilege(userId: number, planBoundaryId: number): Promise<boolean>;
    grantPrivilege(userId: number, planBoundaryId: number, idWho: number): Promise<void>;
    revokePrivilege(userId: number, planBoundaryId: number): Promise<void>;
    hasOtherActiveProjects(userId: number, planBoundaryId: number, excludeProjectId: number): Promise<boolean>;
}
export declare const PROJECTS_REPOSITORY = "PROJECTS_REPOSITORY";
