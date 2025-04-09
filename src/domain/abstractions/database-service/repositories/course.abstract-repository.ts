import { Course } from '@domain/entities/course.entity';
import { ITransaction } from '@domain/abstractions/transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface ICourseRepository {
  createRecord(data: Course, tx?: ITransaction): Promise<Course>;
  getRecordById(id: number, tx?: ITransaction): Promise<Course | null>;
  deleteRecordById(id: number): Promise<Course | null>;
  updateRecordById(id: number, data: Omit<Course, 'id'>): Promise<Course | null>;
  getRecordsList(filterOptions: FilterQueryOptions<Course>): Promise<PaginatedResponse<Course>>;
}
export default ICourseRepository;

