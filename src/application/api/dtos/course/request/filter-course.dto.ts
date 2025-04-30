import { IsOptional, IsString, IsIn, IsInt, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FilterCoursesDto {
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

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiProperty({
    description: 'Order of sorting (asc or desc)',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc'
  })
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    example: 1
  })
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'Number of records per page',
    required: false,
    type: Number,
    minimum: 1,
    example: 10
  })
  limit?: number = 10;
}
