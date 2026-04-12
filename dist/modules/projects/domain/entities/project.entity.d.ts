export declare enum ProjectStatus {
    NEW = 1,
    MANAGER_WORKING = 3,
    ASSIGNED_TECHNICIAN_1 = 4,
    TECHNICIAN_1_WORKING = 5,
    TECHNICIAN_1_CONFIRMED = 6,
    ASSIGNED_TECHNICIAN_2 = 7,
    TECHNICIAN_2_WORKING = 8,
    TECHNICIAN_2_CONFIRMED = 9,
    RETURNED_TECHNICIAN_1 = 10,
    MANAGER_CONFIRMED = 12
}
export declare class Project {
    readonly id: number;
    readonly idProjectManager: number;
    readonly idDrawer1: number | null;
    readonly idDrawer2: number | null;
    readonly idProjectStatus: number;
    readonly idLayer: number | null;
    readonly idPlanBoundary: number | null;
    readonly idWho: number;
    constructor(id: number, idProjectManager: number, idDrawer1: number | null, idDrawer2: number | null, idProjectStatus: number, idLayer: number | null, idPlanBoundary: number | null, idWho: number);
    isStatus(status: ProjectStatus): boolean;
    isAssignedManager(userId: number): boolean;
    isAssignedDrawer1(userId: number): boolean;
    isAssignedDrawer2(userId: number): boolean;
    canStart(): boolean;
    canAssignTechnician1(): boolean;
    canTechnician1Start(): boolean;
    canTechnician1Confirm(): boolean;
    canAssignTechnician2(): boolean;
    canTechnician2Start(): boolean;
    canTechnician2Confirm(): boolean;
    canReturnToTechnician1(): boolean;
    canManagerConfirm(): boolean;
}
