import { Course } from '@domain/entities/course.entity';

import { ITransaction } from '../../transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface ICourseRepository {
  CreateRecord(data: Course, tx?: ITransaction): Promise<Course>;
  UpdateRecordById(id: number, data: Omit<Course, 'id'>, tx?: ITransaction): Promise<Course | null>;
  DeleteRecordById(id: number): Promise<Course | null>;
  GetRecordById(id: number, tx?: ITransaction): Promise<Course | null>;
  GetRecordsList(filterOptions: FilterQueryOptions<Course>): Promise<PaginatedResponse<Course>>;
}

export default ICourseRepository;