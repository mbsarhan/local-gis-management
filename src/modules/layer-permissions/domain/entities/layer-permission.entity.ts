export class LayerPermission {
    constructor(
        public readonly id: number,
        public readonly idUserType: number,
        public readonly idLayer: number,
        public readonly selectB: boolean,
        public readonly insertB: boolean,
        public readonly updateB: boolean,
        public readonly deleteB: boolean,
    ) {}

    hasAtLeastOneFlag(): boolean {
        return this.selectB || this.insertB || this.updateB || this.deleteB;
    }

    // Build the GRANT SQL privileges string based on true flags
    buildGrantPrivileges(): string[] {
        const privileges: string[] = [];
        if (this.selectB) privileges.push('SELECT');
        if (this.insertB) privileges.push('INSERT');
        if (this.updateB) privileges.push('UPDATE');
        if (this.deleteB) privileges.push('DELETE');
        return privileges;
    }
}