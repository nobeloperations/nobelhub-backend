import {  CourseTag } from '@domain/entities/course-tag.entity';
import { ITransaction } from '@domain/abstractions/transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface ICourseTagRepository {
  createTagRecord(data: CourseTag, tx?: ITransaction): Promise<CourseTag>;
 
}

export default ICourseTagRepository;