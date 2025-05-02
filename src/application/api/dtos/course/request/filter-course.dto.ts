import { IsOptional, IsString, IsIn, IsInt, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Course } from '@domain/entities/course.entity';
import { BaseListQueryDto } from '../../common/reequest/filter-query-options.dto';

export class FilterCoursesDto  extends BaseListQueryDto<Course> {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search by course name',
    required: false,
    type: String,
    example: 'Introduction to python'
  })
  search?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Sort results by a specific field',
    required: false,
    type: String,
    example: 'name'
  })
  sortBy?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Filter by tags',
    required: false,
    type: [String],
    example: ['python', 'programming']
  })
  @IsString({ each: true })
  tags?: [];
  protected getFilters() {
    return {
      ...(this.search && { name: this.search }),
      ...(this.tags && { tags: this.tags })
    };
  }
}
