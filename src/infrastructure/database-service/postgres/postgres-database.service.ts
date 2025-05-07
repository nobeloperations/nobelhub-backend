import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@domain/abstractions/integration-services';
import IIntakeRepository from '@domain/abstractions/integration-services/database-service/repositories/intake.abstract-repository';

import { IntakeRepository } from './repositories/intake.repositoyry';
import { ICourseRepository} from '@domain/abstractions/integration-services/database-service/repositories/course.abstract-repository';
import { CourseRepository } from './repositories/course.repository';
import IIntakeStageRepository from '@domain/abstractions/integration-services/database-service/repositories/intake-stage.abstract-repository';
import { IntakeStageRepository } from './repositories/intake-stage.repository';
import IIntakeEventRepository from '@domain/abstractions/integration-services/database-service/repositories/intake-event.abstract-repository';
import { IntakeEventRepository } from './repositories/intake-event.repository';

@Injectable()
export class PostgresDatabaseService implements DatabaseService {
  public readonly intake: IIntakeRepository;
  public readonly intakeStage: IIntakeStageRepository;
  public readonly course: ICourseRepository;
  public readonly intakeEvent: IIntakeEventRepository;

  constructor(
    private readonly intakeRepository: IntakeRepository,
    private readonly intakeStageRepository: IntakeStageRepository,
    private readonly courseRepository: CourseRepository,
    private readonly intakeEventRepository: IntakeEventRepository
  ) {
    this.intake = intakeRepository;
    this.course = courseRepository;
    this.intakeStage = intakeStageRepository;
    this.intakeEvent = intakeEventRepository;
  }
}
