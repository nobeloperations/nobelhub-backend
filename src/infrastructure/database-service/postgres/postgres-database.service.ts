import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/database-service';
import { IIntakeRepository } from '@domain/abstractions/database-service/repositories/intake.abstract-repository';

import { IntakeRepository } from './repositories/intake.repositoyry';

@Injectable()
export class PostgresDatabaseService implements DatabaseService {
  public readonly intake: IIntakeRepository;

  constructor(private readonly intakeRepository: IntakeRepository) {
    this.intake = intakeRepository;
  }
}
