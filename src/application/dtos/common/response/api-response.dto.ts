import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class RequestInfoDto {
  @Expose()
  @ApiProperty({ example: '/api/resource' })
  path: string;

  @Expose()
  @ApiProperty({ example: 'GET' })
  method: string;

  @Expose()
  @ApiProperty({
    example: { id: 1 },
    description: 'Path parameters'
  })
  params: Record<string, any>;

  @Expose()
  @ApiProperty({ example: { search: 'query' }, description: 'Query parameters' })
  query: Record<string, any>;

  @Expose()
  @ApiProperty({ example: { key: 'value' }, description: 'Request body content', required: false })
  body?: Record<string, any>;
}

@Exclude()
export class PaginationDto {
  @Expose()
  @ApiProperty({ example: 100 })
  total: number;

  @Expose()
  @ApiProperty({ example: 2 })
  page: number;

  @Expose()
  @ApiProperty({ example: 10 })
  limit: number;

  @Expose()
  @ApiProperty({ example: 10 })
  totalPages: number;
}

@Exclude()
export class MetaDto {
  @Expose()
  @ApiProperty({ example: 200 })
  statusCode: number;

  @Expose()
  @ApiProperty({ example: 'Request completed successfully' })
  statusMessage: string;

  @Expose()
  @ApiProperty({ example: '2024-11-11T17:10:44.118Z' })
  timestamp: string;

  @Expose()
  @ApiProperty({ type: RequestInfoDto })
  request: RequestInfoDto;

  @Expose()
  @ApiPropertyOptional({
    type: PaginationDto,
    description: 'Pagination details, if applicable',
    required: false
  })
  pagination?: PaginationDto;
}

@Exclude()
export class ApiResponseDto<T> {
  @Expose()
  @ApiProperty({ example: true })
  success: boolean;

  @Expose()
  @ApiProperty({ type: MetaDto })
  meta: MetaDto;

  @Expose()
  @ApiProperty({ description: 'The main response data' })
  data?: T;
}
