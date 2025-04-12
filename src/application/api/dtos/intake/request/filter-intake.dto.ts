import { IsEnum, IsOptional, IsString, IsIn, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntakeProgramType } from '@domain/entities/intake.entity';
import { Type } from 'class-transformer';

export class FilterIntakeDto {
  @ApiProperty({
    description: 'Search by intake name',
    required: false,
    type: String,
    example: 'FEB'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by program type',
    required: false,
    enum: IntakeProgramType,
    example: IntakeProgramType.WEEKDAY
  })
  @IsOptional()
  @IsEnum(IntakeProgramType)
  programType?: IntakeProgramType;

  @ApiProperty({
    description: 'Sort results by a specific field',
    required: false,
    type: String,
    example: 'name'
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: 'Order of sorting (asc or desc)',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc'
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    minimum: 1,
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Number of records per page',
    required: false,
    type: Number,
    minimum: 1,
    example: 10
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
