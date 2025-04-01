import { Intake } from '@domain/entities/intake.entity';
import { IntakeStage } from '@domain/entities/intake-stage.entity';

export enum IntakeStageType {
  INTERNSHIP_INITIATION = 'Internship Initiation',
  INTORO_COURSES = 'Intro Courses',
  LEADERSHIP_FOUNDATIONS = 'Leadership Foundations',
  LEADERSHIP_PRACTICE_BIT = 'Leadership Practice BIT',
  LEADERSHIP_PRACTICE_PAP = 'Leadership Practice PAP',
  LEADERSHIP_PRACTICE_IWD = 'Leadership Practice IWD',
  INTERNSHIP_ONBOARDING = 'Internship Onboarding',
  ADVANCED_LEADERSHIP = 'Advanced Leadership'
}

interface IntakeStageCreationData {
  intake: Intake;
  startDate: Date;
  endDate: Date;
}

export class IntakeStageFactory {
  static create(data: IntakeStageCreationData, stageType: IntakeStageType): IntakeStage {
    const intakeStage = new IntakeStage();
    const { intake, startDate, endDate } = data;

    switch (stageType) {
      case IntakeStageType.INTERNSHIP_INITIATION:
        intakeStage.name = IntakeStageType.INTERNSHIP_INITIATION;
        intakeStage.description = 'Internship Initiation';
        break;
      case IntakeStageType.INTORO_COURSES:
        intakeStage.name = IntakeStageType.INTORO_COURSES;
        intakeStage.description = 'Intro Courses';
        break;
      case IntakeStageType.LEADERSHIP_FOUNDATIONS:
        intakeStage.name = IntakeStageType.LEADERSHIP_FOUNDATIONS;
        intakeStage.description = 'Leadership Foundations';
        break;
      default:
        throw new Error(`Unknown stage type: ${stageType}`);
    }

    intakeStage.intake = intake;

    intakeStage.endDate = endDate;
    intakeStage.startDate = startDate;

    intakeStage.events = [];
    intakeStage.intakeStageToInterns = [];

    return intakeStage;
  }
}
