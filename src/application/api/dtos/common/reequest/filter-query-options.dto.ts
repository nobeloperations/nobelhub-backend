import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, Min, IsInt } from 'class-validator';

import { BaseEntity } from '@domain/entities/base.entity';
import type { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

export abstract class BaseListQueryDto<T extends BaseEntity> {
  @ApiProperty({
    description: 'Sort results by a specific field',
    required: false,
    type: String
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description: 'Order of sorting (asc or desc)',
    required: false,
    enum: ['asc', 'desc']
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    minimum: 1
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
    minimum: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  protected abstract getFilters(): Partial<Record<keyof T, T[keyof T]>>;

  toFilterOptions(): FilterQueryOptions<T> {
    return {
      filters: this.getFilters(),
      page: this.page || 1,
      limit: this.limit || 10,
      order: this.order || 'asc',
      sortBy: (this.sortBy as keyof T) || 'id'
    };
  }
}
