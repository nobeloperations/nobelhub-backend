import { IsOptional, IsString, IsIn, IsInt, Min, IsArray, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCoursesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  teachableId?: string;

  @IsOptional()
  @IsUrl()
  resourceUrl?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];


  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}