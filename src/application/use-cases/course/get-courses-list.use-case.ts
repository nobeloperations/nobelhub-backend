import { Injectable } from '@nestjs/common';

import { Course } from '@domain/entities/course.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';
import { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

@Injectable()
export class GetCourseListUseCase {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(filterOptions: FilterQueryOptions<Course>) {
    return this._databaseService.course.GetRecordsList(filterOptions);
  }
}