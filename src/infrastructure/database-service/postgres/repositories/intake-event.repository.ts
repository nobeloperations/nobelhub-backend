import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { IntakeEvent } from '@domain/entities/intake-event.entity';
import { ITransaction } from '@domain/abstractions/integration-services';

import IIntakeEventRepository from '@domain/abstractions/integration-services/database-service/repositories/intake-event.abstract-repository';

@Injectable()
export class IntakeEventRepository implements IIntakeEventRepository {
  constructor(
    @InjectRepository(IntakeEvent)
    private readonly _repo: Repository<IntakeEvent>
  ) {}
  private getManager(tx?: ITransaction<EntityManager>) {
    return tx ? tx.getManager() : this._repo.manager;
  }

  GetRecordsRelatedToIntakeStage(
    intakeStageId: number,
    tx?: ITransaction<EntityManager>
  ): Promise<IntakeEvent[]> {
    return this.getManager(tx).find(IntakeEvent, {
      where: {
        stage: { id: intakeStageId }
      }
    });
  }

  public async GetRecordsByFilter(
    filter: Partial<IntakeEvent>,
    tx?: ITransaction<EntityManager>
  ): Promise<IntakeEvent[]> {
    return this.getManager(tx).find(IntakeEvent, {
      where: filter
    });
  }
}
