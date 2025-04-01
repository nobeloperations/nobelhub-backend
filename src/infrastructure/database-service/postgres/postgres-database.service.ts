import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/database-service';
import { IIntakeRepository } from '@domain/abstractions/database-service/repositories/intake.abstract-repository';
import { ICourseRepository } from '@domain/abstractions/database-service/repositories/course.abstract-repository';
import { IntakeRepository } from './repositories/intake.repositoyry';


@Injectable()
export class PostgresDatabaseService implements DatabaseService {
  public readonly intake: IIntakeRepository;
  public readonly course: ICourseRepository;
  constructor(private readonly intakeRepository: IntakeRepository) {
    this.intake = intakeRepository;
  }
}
