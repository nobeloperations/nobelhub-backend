import ICourseRepository from './repositories/course.abstract-repository';
import IIntakeRepository from './repositories/intake.abstract-repository';
import ICourseTagRepository from './repositories/course-tag.abstract-repository';

export abstract class DatabaseService {
  abstract intake: IIntakeRepository;
  abstract course: ICourseRepository;
  // abstract courseTag: ICourseTagRepository;
}
