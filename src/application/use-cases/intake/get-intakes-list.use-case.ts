import { Injectable } from '@nestjs/common';

import { Intake } from '@domain/entities/intake.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';
import { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

@Injectable()
export class GetIntakesListUseCase {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(filterOptions: FilterQueryOptions<Intake>) {
    return this._databaseService.intake.GetRecordsList(filterOptions);
  }
}
