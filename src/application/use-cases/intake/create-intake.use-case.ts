import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';
import { TransactionManagerService } from '@domain/abstractions/integration-services/transaction-service';

import { IntakeScheduleGenerator } from '@application/services';

@Injectable()
export class CreateIntakeUseCase {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _intakeScheduleGenerator: IntakeScheduleGenerator,
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

  private calculateApplicationDeadline(intake: Intake): Date {
    return dayjs(intake.startDate).subtract(this.APPLICATION_DEADLINE_OFFSET_DAYS, 'day').toDate();
  }

  public async Execute(intakeData: Intake) {
    return this._transactionManagerService.StartTransaction(async tx => {
      intakeData.name = this.generateIntakeName(intakeData);
      intakeData.applicationDeadline = this.calculateApplicationDeadline(intakeData);

      const intake = await this._databaseService.intake.CreateRecord(intakeData, tx);

      const intakeScheduleData = this._intakeScheduleGenerator.GetIntakeSchedule(intake);

      await this._databaseService.intakeStage.CreateManyRecords(intakeScheduleData, tx);

      return intake;
    });
  }
}
