import { IsEnum, IsOptional, IsString, IsIn, Min, IsInt } from 'class-validator';

import { IntakeProgramType } from '@domain/entities/intake.entity';
import { Type } from 'class-transformer';

export class FilterIntakeDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(IntakeProgramType)
  programType?: IntakeProgramType;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
