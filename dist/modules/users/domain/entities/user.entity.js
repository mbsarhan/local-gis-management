"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, username, isActive, idUserType, idGroup, token) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.isActive = isActive;
        this.idUserType = idUserType;
        this.idGroup = idGroup;
        this.token = token;
    }
    isInactive() {
        return !this.isActive;
    }
    isSameUser(otherId) {
        return this.id === otherId;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map