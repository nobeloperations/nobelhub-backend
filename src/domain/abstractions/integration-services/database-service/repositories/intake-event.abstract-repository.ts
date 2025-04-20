import { IntakeEvent } from '@domain/entities/intake-event.entity';

import { ITransaction } from '../../transaction-service';

export interface IIntakeEventRepository {
  GetRecordsRelatedToIntakeStage(intakeStageId: number, tx?: ITransaction): Promise<IntakeEvent[]>;
  GetRecordsByFilter(filter: Partial<IntakeEvent>, tx?: ITransaction): Promise<IntakeEvent[]>;
}

export default IIntakeEventRepository;
