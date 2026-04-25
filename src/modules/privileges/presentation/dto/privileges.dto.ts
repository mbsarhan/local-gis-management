import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GrantPrivilegeDto {
    @ApiProperty({ type: Number, example: 10 })
    id_user:          number;
    @ApiProperty({ type: Number, example: 3 })
    id_governorate:   number;
    @ApiPropertyOptional({ type: Number, example: 160 })
    id_township?:     number;
    @ApiPropertyOptional({ type: Number, example: 45 })
    id_community?:    number;
    @ApiPropertyOptional({ type: Number, example: 100 })
    id_plan_boundary?: number;
}
