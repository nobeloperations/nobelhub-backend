import IIntakeRepository from './repositories/intake.abstract-repository';
import IIntakeStageRepository from './repositories/intake-stage.abstract-repository';
import IIntakeEventRepository from './repositories/intake-event.abstract-repository';
import { ICourseRepository } from './repositories/course.abstract-repository';

export abstract class DatabaseService {
  abstract course: ICourseRepository;
  abstract intake: IIntakeRepository;
  abstract intakeStage: IIntakeStageRepository;
  abstract intakeEvent: IIntakeEventRepository;
}
