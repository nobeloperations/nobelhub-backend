import { Injectable } from '@nestjs/common';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';
import { IntakeStage, IntakeStageType } from '@domain/entities/intake-stage.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';
import { OnlineEventsService } from '@domain/abstractions/integration-services/online-events-service';
import { TransactionManagerService } from '@domain/abstractions/integration-services/transaction-service';
import { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

const IntakeStagesScheduleConfigurations: Record<
  IntakeProgramType,
  { type: IntakeStageType; startOffset: number; endOffset: number }[]
> = {
  [IntakeProgramType.WEEKDAY]: [
    { type: IntakeStageType.INTERNSHIP_INITIATION, startOffset: 0, endOffset: 5 },
    { type: IntakeStageType.INTORO_COURSES, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_FOUNDATIONS, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_BIT, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_PAP, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_IWD, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.INTERNSHIP_ONBOARDING, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.ADVANCED_LEADERSHIP, startOffset: 2, endOffset: 7 }
  ],
  [IntakeProgramType.WEEKEND]: [
    { type: IntakeStageType.INTERNSHIP_INITIATION, startOffset: 0, endOffset: 14 },
    { type: IntakeStageType.INTORO_COURSES, startOffset: 14, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_FOUNDATIONS, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_BIT, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_PAP, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.LEADERSHIP_PRACTICE_IWD, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.INTERNSHIP_ONBOARDING, startOffset: 2, endOffset: 7 },
    { type: IntakeStageType.ADVANCED_LEADERSHIP, startOffset: 2, endOffset: 7 }
  ]
};

const IntakeStageTypeDetails: Record<IntakeStageType, string> = {
  [IntakeStageType.INTERNSHIP_ONBOARDING]: 'Onboarding process for interns',
  [IntakeStageType.LEADERSHIP_FOUNDATIONS]: 'Foundational leadership training',
  [IntakeStageType.INTORO_COURSES]: 'Introductory courses for new participants',
  [IntakeStageType.LEADERSHIP_PRACTICE_BIT]: 'Leadership practice focused on BIT',
  [IntakeStageType.LEADERSHIP_PRACTICE_PAP]: 'Leadership practice focused on PAP',
  [IntakeStageType.LEADERSHIP_PRACTICE_IWD]: 'Leadership practice focused on IWD',
  [IntakeStageType.INTERNSHIP_INITIATION]: 'The initial stage of the internship program',
  [IntakeStageType.ADVANCED_LEADERSHIP]: 'Advanced leadership training for experienced participants'
};

@Injectable()
export class IntakeUseCases {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _onlineEventsService: OnlineEventsService,
    private readonly _transactionManagerService: TransactionManagerService
  ) {}

  private readonly APPLICATION_DEADLINE_OFFSET_DAYS = 7;

  private generateIntakeName(intake: Intake): string {
    const date = new Date(intake.startDate);

    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

    const programTypeCode = intake.programType === IntakeProgramType.WEEKDAY ? 'WD' : 'WE';

    return `${month} ${day} ${programTypeCode} ${year}`;
  }

  private shiftDateByDays(date: Date, days: number): Date {
    return new Date(date.setDate(date.getDate() + days));
  }

  private calculateApplicationDeadline(intake: Intake): Date {
    const date = new Date(intake.startDate);
    date.setDate(date.getDate() - this.APPLICATION_DEADLINE_OFFSET_DAYS);

    return date;
  }

  private generateIntakeStagesSchedule(intakeData: Intake): IntakeStage[] {
    return IntakeStagesScheduleConfigurations[intakeData.programType].map(config =>
      Object.assign(new IntakeStage(), {
        intake: intakeData,
        stageType: config.type,
        details: IntakeStageTypeDetails[config.type],
        startDate: this.shiftDateByDays(intakeData.startDate, config.startOffset),
        endDate: this.shiftDateByDays(intakeData.startDate, config.startOffset + config.endOffset)
      })
    );
  }

  public async CreateIntake(intakeData: Intake) {
    intakeData.name = this.generateIntakeName(intakeData);

    intakeData.applicationDeadline = this.calculateApplicationDeadline(intakeData);

    this._transactionManagerService.startTransaction(async tx => {
      const createdIntake = await this._databaseService.intake.createRecord(intakeData, tx);

      return createdIntake;
    });
  }

  public async GetIntakeById(id: number) {
    const targetIntake = await this._databaseService.intake.getRecordById(id);

    return targetIntake;
  }

  public async GetIntakesList(filterOptions: FilterQueryOptions<Intake>) {
    const intakesList = await this._databaseService.intake.getRecordsList(filterOptions);

    return intakesList;
  }

  public async UpdateIntakeById(id: number, intakeData: Intake) {
    intakeData.name = this.generateIntakeName(intakeData);
    intakeData.applicationDeadline = this.calculateApplicationDeadline(intakeData);

    const updatedIntake = await this._databaseService.intake.updateRecordById(id, intakeData);

    return updatedIntake;
  }

  public async DeleteIntakeById(id: number) {
    const deletedIntake = await this._databaseService.intake.deleteRecordById(id);

    return deletedIntake;
  }
}
