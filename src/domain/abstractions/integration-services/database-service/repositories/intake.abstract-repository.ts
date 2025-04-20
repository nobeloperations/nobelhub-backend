import { Intake } from '@domain/entities/intake.entity';

import { ITransaction } from '../../transaction-service';
import { FilterQueryOptions } from '../query-options/filter.query-options';
import { PaginatedResponse } from '../data-models/paginated-response.model';

export interface IIntakeRepository {
  DeleteRecordById(id: number): Promise<Intake | null>;
  CreateRecord(data: Intake, tx?: ITransaction): Promise<Intake>;
  GetRecordById(id: number, tx?: ITransaction): Promise<Intake | null>;
  GetRecordsList(filterOptions: FilterQueryOptions<Intake>): Promise<PaginatedResponse<Intake>>;
}

export default IIntakeRepository;
