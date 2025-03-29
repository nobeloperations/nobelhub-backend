import dayjs from 'dayjs';

import { IntakeStage } from '@domain/entities/intake-stage.entity';
import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';
import { IntakeStageFactory, IntakeStageType } from '@domain/factories/intake-stage.factory';

interface IntakeStageConfig {
  stageType: IntakeStageType;
  startOffset: number;
  endOffset: number;
}

export class IntakeStagesBuilder {
  public static buildStages(intake: Intake): IntakeStage[] {
    const startDate = dayjs(intake.startDate);
    const stageConfigs = this.getStageConfigsByProgramType(intake.programType);

    const stages = stageConfigs.map(config =>
      IntakeStageFactory.create(
        {
          intake,
          startDate: startDate.add(config.startOffset, 'day').toDate(),
          endDate: startDate.add(config.endOffset, 'day').toDate()
        },
        config.stageType
      )
    );

    return stages;
  }

  public static getStageConfigsByProgramType(programType: string): IntakeStageConfig[] {
    switch (programType) {
      case IntakeProgramType.WEEKDAY:
        return [
          { stageType: IntakeStageType.INTERNSHIP_INITIATION, startOffset: 0, endOffset: 5 },
          { stageType: IntakeStageType.INTORO_COURSES, startOffset: 6, endOffset: 13 },
          { stageType: IntakeStageType.LEADERSHIP_FOUNDATIONS, startOffset: 14, endOffset: 20 },
          { stageType: IntakeStageType.LEADERSHIP_PRACTICE_BIT, startOffset: 21, endOffset: 33 }
        ];
      case IntakeProgramType.WEEKEND:
        return [
          { stageType: IntakeStageType.INTERNSHIP_INITIATION, startOffset: 0, endOffset: 7 },
          { stageType: IntakeStageType.INTORO_COURSES, startOffset: 8, endOffset: 15 },
          { stageType: IntakeStageType.LEADERSHIP_FOUNDATIONS, startOffset: 16, endOffset: 22 },
          { stageType: IntakeStageType.LEADERSHIP_PRACTICE_PAP, startOffset: 23, endOffset: 30 }
        ];
      default:
        throw new Error(`Unknown program type: ${programType}`);
    }
  }
}
