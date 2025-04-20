import { Intake } from '@domain/entities/intake.entity';
import { IntakeStage } from '@domain/entities/intake-stage.entity';

export interface IIntakeScheduleGenerator {
  GetIntakeSchedule(intakeData: Intake): IntakeStage[];
}
