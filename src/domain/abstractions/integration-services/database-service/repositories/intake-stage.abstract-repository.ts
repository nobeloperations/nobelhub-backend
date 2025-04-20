import { IntakeStage } from '@domain/entities/intake-stage.entity';

import { ITransaction } from '../../transaction-service';

export interface IIntakeStageRepository {
  CreateManyRecords(data: IntakeStage[], tx?: ITransaction): Promise<IntakeStage[]>;
  GetRecordsRelatedToIntake(intakeId: number, tx?: ITransaction): Promise<IntakeStage[]>;
}

export default IIntakeStageRepository;
