import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginatedResponseDto<T> {
  @Expose()
  data: T[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;
}
