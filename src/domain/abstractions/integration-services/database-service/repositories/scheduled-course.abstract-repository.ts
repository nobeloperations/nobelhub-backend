import { ITransaction } from '@domain/abstractions/integrations/transaction-service';
import { ScheduledCourse } from '@domain/entities/scheduled-course.entity';

import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface IScheduledCourseRepository {
  createRecord(data: ScheduledCourse, tx?: ITransaction): Promise<ScheduledCourse>;
  getRecordById(id: number, tx?: ITransaction): Promise<ScheduledCourse | null>;
  deleteRecordById(id: number): Promise<ScheduledCourse | null>;
  updateRecordById(id: number, data: Omit<ScheduledCourse, 'id'>): Promise<ScheduledCourse | null>;
  getRecordsList(
    filterOptions: FilterQueryOptions<ScheduledCourse>
  ): Promise<PaginatedResponse<ScheduledCourse>>;
}

export default IScheduledCourseRepository;
