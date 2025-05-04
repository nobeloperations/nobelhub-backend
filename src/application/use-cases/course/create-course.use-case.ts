
import { Injectable } from '@nestjs/common';

import { Course } from '@domain/entities/course.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service'
import { TransactionManagerService } from '@domain/abstractions/integration-services/transaction-service';

@Injectable()
export class CreateCourseUseCase {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _transactionManagerService: TransactionManagerService
  ) {}

  public async Execute(courseData: Course) {
    return this._transactionManagerService.StartTransaction(async tx => {
      const course = await this._databaseService.course.CreateRecord(courseData, tx);
      return course;
    });
  }
}
