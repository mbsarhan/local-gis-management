import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({ type: Number, example: 10 })
    id_project_manager: number;
    @ApiProperty({ type: Number, example: 100 })
    id_plan_boundary:   number;
    @ApiProperty({ type: Number, example: 3 })
    id_layer:           number;
}

export class AssignTechnician1Dto {
    @ApiProperty({ type: Number, example: 20 })
    id_drawer_1: number;
}

export class AssignTechnician2Dto {
    @ApiProperty({ type: Number, example: 30 })
    id_drawer_2: number;
}
