import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateControlAdminDto {
    @ApiPropertyOptional({ type: Number, example: 5 })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    id_community?: number;

    @ApiPropertyOptional({ type: Number, example: 2 })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    id_type_regulatory_area?: number;

    @ApiPropertyOptional({ type: Number, example: 120 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    minimum_property_area?: number;

    @ApiPropertyOptional({ type: Number, example: 500 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    maximum_property_area?: number;

    @ApiPropertyOptional({ type: Number, example: 0.6 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    construction_ratio?: number;

    @ApiPropertyOptional({ type: Number, example: 10 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    minimum_interface?: number;

    @ApiPropertyOptional({ type: Number, example: 4 })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(0)
    number_of_floors?: number;

    @ApiPropertyOptional({ type: Number, example: 12 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    height?: number;

    @ApiPropertyOptional({ type: Number, example: 2 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    front_duties?: number;

    @ApiPropertyOptional({ type: Number, example: 2 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    back_duties?: number;

    @ApiPropertyOptional({ type: Number, example: 2 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    side_duties?: number;

    @ApiPropertyOptional({ type: String, example: 'ملاحظة' })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiPropertyOptional({ type: Number, example: 4 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    height_of_ground_floors?: number;

    @ApiPropertyOptional({ type: Number, example: 1.2 })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    investment_factor?: number;
}
