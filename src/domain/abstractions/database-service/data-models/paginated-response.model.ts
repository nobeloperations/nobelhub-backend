import { BaseEntity } from '@domain/entities/base.entity';

export interface PaginatedResponse<T extends BaseEntity> {
  data: T[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
}
