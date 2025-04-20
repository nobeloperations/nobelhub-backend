import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';

@Injectable()
export class GetTargetIntakeUseCase {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(intakeId: number) {
    return this._databaseService.intake.GetRecordById(intakeId);
  }
}
