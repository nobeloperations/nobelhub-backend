import { Intake } from '@domain/entities/intake.entity';

import { ITransaction } from '../../transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface IIntakeRepository {
  createRecord(data: Intake, tx?: ITransaction): Promise<Intake>;
  getRecordById(id: number, tx?: ITransaction): Promise<Intake | null>;
  deleteRecordById(id: number): Promise<Intake | null>;
  updateRecordById(id: number, data: Omit<Intake, 'id'>): Promise<Intake | null>;
  getRecordsList(filterOptions: FilterQueryOptions<Intake>): Promise<PaginatedResponse<Intake>>;
}

export default IIntakeRepository;
