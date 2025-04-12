import { IntakeStage } from '@domain/entities/intake-stage.entity';
import { ITransaction } from '@domain/abstractions/integrations/transaction-service';

export interface IIntakeStageRepository {
  createManyRecords(data: IntakeStage[], tx?: ITransaction): Promise<IntakeStage[]>;
}

export default IIntakeStageRepository;
