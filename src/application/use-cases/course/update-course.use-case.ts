import { Injectable } from '@nestjs/common';

import { Course } from '@domain/entities/course.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';

@Injectable()
export class UpdateCourseUseCase {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(id: number, courseData: Course) {
    return this._databaseService.course.UpdateRecordById(id, courseData);
  }
}