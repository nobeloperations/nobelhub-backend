import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';

@Injectable()
export class GetIntakeStageEvents {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async Execute(intakeStageId: number) {
    return this._databaseService.intakeEvent.GetRecordsRelatedToIntakeStage(intakeStageId);
  }
}
