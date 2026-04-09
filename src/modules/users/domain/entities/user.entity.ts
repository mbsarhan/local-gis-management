export class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly username: string,
        public readonly isActive: boolean,
        public readonly idUserType: number,
        public readonly idGroup: number,
        public readonly token?: string,
    ) {}

    isInactive(): boolean {
        return !this.isActive;
    }

    isSameUser(otherId: number): boolean {
        return this.id === otherId;
    }
}