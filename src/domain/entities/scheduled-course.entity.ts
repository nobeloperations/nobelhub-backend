import { Entity, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';

import { Course } from './course.entity';
import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { InternToScheduledCourse } from './intern-to-scheduled-course.entity';
import { ScheduledCourseToEvent } from './scheduled-course-to-event';

@Entity('scheduled_courses')
export class ScheduledCourse extends BaseEntity {
  @Column({ name: 'code', type: 'text' })
  code: string;

  @Column({ name: 'launch_date', type: 'date' })
  launchDate: Date;

  @Column({ name: 'duration_in_days', type: 'smallint' })
  durationInDays: number;

  @Column({ name: 'resources_url', type: 'timestamp', unique: true })
  resourceUrl: string;

  @ManyToMany(() => Course, Course => Course.schdeuledCourses)
  course: Course;

  @ManyToOne(() => Intake, intake => intake.scheduledCourses)
  intake: Intake;

  @OneToMany(
    () => InternToScheduledCourse,
    internToScheduledCourse => internToScheduledCourse.scheduledCourse
  )
  internToScheduledCourses: InternToScheduledCourse[];

  @OneToMany(
    () => ScheduledCourseToEvent,
    scheduledCourseToEvent => scheduledCourseToEvent.scheduledCourse
  )
  scheduledCourseToEvents: ScheduledCourseToEvent[];
}
