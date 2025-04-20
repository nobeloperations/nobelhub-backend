import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { IntakeStage } from '@domain/entities/intake-stage.entity';

import { ITransaction } from '@domain/abstractions/integration-services';
import IIntakeStageRepository from '@domain/abstractions/integration-services/database-service/repositories/intake-stage.abstract-repository';

@Injectable()
export class IntakeStageRepository implements IIntakeStageRepository {
  constructor(
    @InjectRepository(IntakeStage)
    private readonly _repo: Repository<IntakeStage>
  ) {}

  private getManager(tx?: ITransaction<EntityManager>) {
    return tx ? tx.getManager() : this._repo.manager;
  }

  CreateManyRecords(data: IntakeStage[], tx?: ITransaction<EntityManager>): Promise<IntakeStage[]> {
    return this.getManager(tx).save(IntakeStage, data);
  }

  GetRecordsRelatedToIntake(
    intakeId: number,
    tx?: ITransaction<EntityManager>
  ): Promise<IntakeStage[]> {
    return this.getManager(tx).find(IntakeStage, {
      where: {
        intake: { id: intakeId }
      }
    });
  }
}
