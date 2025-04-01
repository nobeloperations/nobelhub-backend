import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';

import { Course } from './course.entity';
import { BaseEntity } from './base.entity';
import { InternToScheduledCourse } from './intern-to-scheduled-course.entity';
import { ScheduledCourseToEvent } from './scheduled-course-to-event';

@Entity('scheduled_courses')
export class ScheduledCourse extends BaseEntity {
  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'code', type: 'text' })
  code: string;

  @Column({ name: 'teachable_id', type: 'timestamp' })
  teachableId: Date;

  @Column({ name: 'resources_url', type: 'timestamp', unique: true })
  resourceUrl: string;

  @ManyToMany(() => Course, Course => Course.schdeuledCourses)
  course: Course;

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
