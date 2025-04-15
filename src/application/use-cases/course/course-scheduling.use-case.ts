import dayjs from 'dayjs';

import { Course } from '@domain/entities/course.entity';

import { DatabaseService } from '@domain/abstractions/integration-services/database-service';
import { OnlineEventsService } from '@domain/abstractions/integration-services/online-events-service';

export class CourseSchedulingUseCase {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _onlineEventsService: OnlineEventsService
  ) {}

  private generateScheduledCourseCode(course: Course, launchDate: Date, section: number): string {
    const courseCode = course.code;
    const scheduledDate = dayjs(launchDate);
    const sectionLetter = String.fromCharCode(97 + section);

    const yearSuffix = scheduledDate.format('YY');
    const startOfYear = dayjs(`${scheduledDate.year()}-01-01`);
    const isoDay = scheduledDate.day() === 0 ? 7 : scheduledDate.day();

    const daysDiff = scheduledDate.startOf('day').diff(startOfYear, 'day');
    const weekNumber = Math.ceil((daysDiff + startOfYear.day()) / 7);

    return `${courseCode}${yearSuffix}${isoDay}-${weekNumber}-${sectionLetter}`;
  }

  public async Execute() {}
}
