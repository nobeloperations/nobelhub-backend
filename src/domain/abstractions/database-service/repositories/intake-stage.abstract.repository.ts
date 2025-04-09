import { IntakeStage } from '@domain/entities/intake-stage.entity';

interface IIntakeStageRepository {
  createRecord(data: IntakeStage): Promise<IntakeStage>;
  getRecordById(id: number): Promise<IntakeStage | null>;
  deleteRecordById(id: number): Promise<IntakeStage | null>;
  updateRecordById(id: number, data: Omit<IntakeStage, 'id'>): Promise<IntakeStage | null>;
<<<<<<< HEAD
  
=======
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  getRecordsList(): Promise<IntakeStage[]>;
}

export default IIntakeStageRepository;
