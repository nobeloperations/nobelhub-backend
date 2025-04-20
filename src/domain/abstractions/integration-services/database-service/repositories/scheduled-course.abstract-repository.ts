import { ScheduledCourse } from '@domain/entities/scheduled-course.entity';

import { ITransaction } from '../../transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface IScheduledCourseRepository {
  CreateRecord(data: ScheduledCourse, tx?: ITransaction): Promise<ScheduledCourse>;
  GetRecordById(id: number, tx?: ITransaction): Promise<ScheduledCourse | null>;
  DeleteRecordById(id: number): Promise<ScheduledCourse | null>;
  UpdateRecordById(id: number, data: Omit<ScheduledCourse, 'id'>): Promise<ScheduledCourse | null>;
  GetRecordsList(
    filterOptions: FilterQueryOptions<ScheduledCourse>
  ): Promise<PaginatedResponse<ScheduledCourse>>;
}

export default IScheduledCourseRepository;
