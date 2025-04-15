import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

import { BaseListQueryDto } from '../../common/reequest/filter-query-options.dto';

export class FilterIntakeDto extends BaseListQueryDto<Intake> {
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

  protected getFilters() {
    return {
      ...(this.programType && { programType: this.programType })
    };
  }
}
