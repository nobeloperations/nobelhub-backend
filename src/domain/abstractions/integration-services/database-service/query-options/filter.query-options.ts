import { BaseEntity } from '@domain/entities/base.entity';

export interface FilterQueryOptions<T extends BaseEntity> {
  search?: string;

  page?: number;
  limit?: number;

  sortBy: keyof T;
  order: 'asc' | 'desc';

  filters?: Partial<Record<keyof T, T[keyof T]>>;
}
