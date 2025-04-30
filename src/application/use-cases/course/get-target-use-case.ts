import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';

@Injectable()
export class GetTargetCourseUseCase {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(CourseId: number) {
    return this._databaseService.course.GetRecordById(CourseId);
  }
}