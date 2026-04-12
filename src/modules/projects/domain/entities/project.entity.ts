export enum ProjectStatus {
    NEW                    = 1,
    MANAGER_WORKING        = 3,
    ASSIGNED_TECHNICIAN_1  = 4,
    TECHNICIAN_1_WORKING   = 5,
    TECHNICIAN_1_CONFIRMED = 6,
    ASSIGNED_TECHNICIAN_2  = 7,
    TECHNICIAN_2_WORKING   = 8,
    TECHNICIAN_2_CONFIRMED = 9,
    RETURNED_TECHNICIAN_1  = 10,
    MANAGER_CONFIRMED      = 12,
}

export class Project {
    constructor(
        public readonly id: number,
        public readonly idProjectManager: number,
        public readonly idDrawer1: number | null,
        public readonly idDrawer2: number | null,
        public readonly idProjectStatus: number,
        public readonly idLayer: number | null,
        public readonly idPlanBoundary: number | null,
        public readonly idWho: number,
    ) {}

    isStatus(status: ProjectStatus): boolean {
        return this.idProjectStatus === status;
    }

    isAssignedManager(userId: number): boolean {
        return this.idProjectManager === userId;
    }

    isAssignedDrawer1(userId: number): boolean {
        return this.idDrawer1 === userId;
    }

    isAssignedDrawer2(userId: number): boolean {
        return this.idDrawer2 === userId;
    }

    canStart(): boolean {
        return this.isStatus(ProjectStatus.NEW);
    }

    canAssignTechnician1(): boolean {
        return this.isStatus(ProjectStatus.MANAGER_WORKING);
    }

    canTechnician1Start(): boolean {
        return this.isStatus(ProjectStatus.ASSIGNED_TECHNICIAN_1);
    }

    canTechnician1Confirm(): boolean {
        return this.isStatus(ProjectStatus.TECHNICIAN_1_WORKING);
    }

    canAssignTechnician2(): boolean {
        return this.isStatus(ProjectStatus.TECHNICIAN_1_CONFIRMED);
    }

    canTechnician2Start(): boolean {
        return this.isStatus(ProjectStatus.ASSIGNED_TECHNICIAN_2);
    }

    canTechnician2Confirm(): boolean {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_WORKING);
    }

    canReturnToTechnician1(): boolean {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_CONFIRMED);
    }

    canManagerConfirm(): boolean {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_CONFIRMED);
    }
}