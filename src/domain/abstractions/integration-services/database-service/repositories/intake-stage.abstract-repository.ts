import { IntakeStage } from '@domain/entities/intake-stage.entity';

import { ITransaction } from '../../transaction-service';

export interface IIntakeStageRepository {
  createManyRecords(data: IntakeStage[], tx?: ITransaction): Promise<IntakeStage[]>;
}

export default IIntakeStageRepository;
