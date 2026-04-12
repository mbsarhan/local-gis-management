"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["NEW"] = 1] = "NEW";
    ProjectStatus[ProjectStatus["MANAGER_WORKING"] = 3] = "MANAGER_WORKING";
    ProjectStatus[ProjectStatus["ASSIGNED_TECHNICIAN_1"] = 4] = "ASSIGNED_TECHNICIAN_1";
    ProjectStatus[ProjectStatus["TECHNICIAN_1_WORKING"] = 5] = "TECHNICIAN_1_WORKING";
    ProjectStatus[ProjectStatus["TECHNICIAN_1_CONFIRMED"] = 6] = "TECHNICIAN_1_CONFIRMED";
    ProjectStatus[ProjectStatus["ASSIGNED_TECHNICIAN_2"] = 7] = "ASSIGNED_TECHNICIAN_2";
    ProjectStatus[ProjectStatus["TECHNICIAN_2_WORKING"] = 8] = "TECHNICIAN_2_WORKING";
    ProjectStatus[ProjectStatus["TECHNICIAN_2_CONFIRMED"] = 9] = "TECHNICIAN_2_CONFIRMED";
    ProjectStatus[ProjectStatus["RETURNED_TECHNICIAN_1"] = 10] = "RETURNED_TECHNICIAN_1";
    ProjectStatus[ProjectStatus["MANAGER_CONFIRMED"] = 12] = "MANAGER_CONFIRMED";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
class Project {
    constructor(id, idProjectManager, idDrawer1, idDrawer2, idProjectStatus, idLayer, idPlanBoundary, idWho) {
        this.id = id;
        this.idProjectManager = idProjectManager;
        this.idDrawer1 = idDrawer1;
        this.idDrawer2 = idDrawer2;
        this.idProjectStatus = idProjectStatus;
        this.idLayer = idLayer;
        this.idPlanBoundary = idPlanBoundary;
        this.idWho = idWho;
    }
    isStatus(status) {
        return this.idProjectStatus === status;
    }
    isAssignedManager(userId) {
        return this.idProjectManager === userId;
    }
    isAssignedDrawer1(userId) {
        return this.idDrawer1 === userId;
    }
    isAssignedDrawer2(userId) {
        return this.idDrawer2 === userId;
    }
    canStart() {
        return this.isStatus(ProjectStatus.NEW);
    }
    canAssignTechnician1() {
        return this.isStatus(ProjectStatus.MANAGER_WORKING) ||
            this.isStatus(ProjectStatus.RETURNED_TECHNICIAN_1);
    }
    canTechnician1Start() {
        return this.isStatus(ProjectStatus.ASSIGNED_TECHNICIAN_1);
    }
    canTechnician1Confirm() {
        return this.isStatus(ProjectStatus.TECHNICIAN_1_WORKING);
    }
    canAssignTechnician2() {
        return this.isStatus(ProjectStatus.TECHNICIAN_1_CONFIRMED);
    }
    canTechnician2Start() {
        return this.isStatus(ProjectStatus.ASSIGNED_TECHNICIAN_2);
    }
    canTechnician2Confirm() {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_WORKING);
    }
    canReturnToTechnician1() {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_CONFIRMED);
    }
    canManagerConfirm() {
        return this.isStatus(ProjectStatus.TECHNICIAN_2_CONFIRMED);
    }
}
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map