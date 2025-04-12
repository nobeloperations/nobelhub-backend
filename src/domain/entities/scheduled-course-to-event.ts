import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from './online-event.entity';
import { ScheduledCourse } from './scheduled-course.entity';

@Entity('scheduled_courses_events')
export class ScheduledCourseToEvent {
  @PrimaryGeneratedColumn()
  public scheduledCourseToEventId: number;

  @Column()
  public scheduledCourseId: number;

  @Column()
  public eventId: number;

  @Column()
  public isExpo: boolean;

  @ManyToOne(() => ScheduledCourse, scheduledCourse => scheduledCourse.scheduledCourseToEvents)
  public scheduledCourse: ScheduledCourse;

  @ManyToOne(() => Event, event => event.scheduledCourseToEvents)
  public event: Event;
}
