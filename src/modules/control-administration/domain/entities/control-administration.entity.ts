export class ControlAdministrationEntity {
    constructor(
        public readonly id: number | null,
        public readonly id_community: number | null,
        public readonly id_type_regulatory_area: number | null,
        public readonly minimum_property_area: number | null,
        public readonly maximum_property_area: number | null,
        public readonly construction_ratio: number | null,
        public readonly minimum_interface: number | null,
        public readonly number_of_floors: number | null,
        public readonly height: number | null,
        public readonly front_duties: number | null,
        public readonly back_duties: number | null,
        public readonly side_duties: number | null,
        public readonly notes: string | null,
        public readonly id_who: number | null,
        public readonly height_of_ground_floors: number | null,
        public readonly investment_factor: number | null,

        public readonly community_name?: string,
        public readonly type_regulatory_area_name?: string,
    ) {}

    
    public validate(): { isValid: boolean; message?: string } {
        if (this.construction_ratio !== null) {
            if (this.construction_ratio < 0 || this.construction_ratio > 1) {
                return { isValid: false, message: 'خطأ في نسبة البناء: يجب أن تكون بين 0 و 1' };
            }
        }

        if (this.number_of_floors !== null) {
            if (this.number_of_floors < 0 || this.number_of_floors > 100) {
                return { isValid: false, message: 'خطأ في عدد الطوابق: يجب أن يكون بين 0 و 100' };
            }
        }

        return { isValid: true };
    }

    
    public calculateAllowedConstructionArea(landArea: number): number {
        return landArea * (this.construction_ratio || 0);
    }
}