import { ScheduledCourse } from '@domain/entities/scheduled-course.entity';

import { ITransaction } from '../../transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface IOnlineEventRepository {
  createRecord(data: ScheduledCourse, tx?: ITransaction): Promise<ScheduledCourse>;
  getRecordById(id: number, tx?: ITransaction): Promise<ScheduledCourse | null>;
  deleteRecordById(id: number): Promise<ScheduledCourse | null>;
  updateRecordById(id: number, data: Omit<ScheduledCourse, 'id'>): Promise<ScheduledCourse | null>;
  getRecordsList(
    filterOptions: FilterQueryOptions<ScheduledCourse>
  ): Promise<PaginatedResponse<ScheduledCourse>>;
}

export default IOnlineEventRepository;
