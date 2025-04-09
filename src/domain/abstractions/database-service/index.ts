<<<<<<< HEAD
import ICourseRepository from './repositories/course.abstract-repository';
import IIntakeRepository from './repositories/intake.abstract-repository';
import ICourseTagRepository from './repositories/course-tag.abstract-repository';

export abstract class DatabaseService {
  abstract intake: IIntakeRepository;
  abstract course: ICourseRepository;
  // abstract courseTag: ICourseTagRepository;
=======
import IIntakeRepository from './repositories/intake.abstract-repository';

export abstract class DatabaseService {
  abstract intake: IIntakeRepository;
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
}
