import { Injectable } from '@nestjs/common';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

import { DatabaseService } from '@domain/abstractions/database-service';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';
import { TransactionManagerService } from '@domain/abstractions/transaction-service';

@Injectable()
export class IntakeUseCases {
  constructor(
    private readonly _databaseService: DatabaseService,
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
    const date = new Date(intake.startDate);
    date.setDate(date.getDate() - this.APPLICATION_DEADLINE_OFFSET_DAYS);

    return date;
  }

  public async CreateIntake(intakeData: Intake) {
    intakeData.name = this.generateIntakeName(intakeData);
    intakeData.applicationDeadline = this.calculateApplicationDeadline(intakeData);

    try {
      const createdIntake = await this._transactionManagerService.startTransaction(async tx => {
        const intakeData2 = { ...intakeData, name: 'Another Intake Name' };
        const createdIntake1 = await this._databaseService.intake.createRecord(intakeData, tx);
        const createdIntake2 = await this._databaseService.intake.createRecord(intakeData2, tx);

        throw new Error('Simulated error for transaction rollback');
        return { createdIntake1, createdIntake2 };
      });
      return createdIntake;
    } catch (error) {
      console.error('Transaction failed:');
    }
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
