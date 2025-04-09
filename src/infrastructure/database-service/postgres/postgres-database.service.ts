import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/database-service';
import { IIntakeRepository } from '@domain/abstractions/database-service/repositories/intake.abstract-repository';
<<<<<<< HEAD
import { ICourseRepository } from '@domain/abstractions/database-service/repositories/course.abstract-repository';
import { IntakeRepository } from './repositories/intake.repositoyry';

=======

import { IntakeRepository } from './repositories/intake.repositoyry';
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717

@Injectable()
export class PostgresDatabaseService implements DatabaseService {
  public readonly intake: IIntakeRepository;
<<<<<<< HEAD
  public readonly course: ICourseRepository;
=======

>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  constructor(private readonly intakeRepository: IntakeRepository) {
    this.intake = intakeRepository;
  }
}
