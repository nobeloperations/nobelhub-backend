import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Intern } from './intern.entity';
import { BaseEntity } from './base.entity';
import { ScheduledCourseToEvent } from './scheduled-course-to-event';

@Entity('events')
export class Event extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 75 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  description: string;

  @Column({ name: 'meeting_link', type: 'varchar', length: 100 })
  meetingLink: string;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'google_calendar_event_id', type: 'text', unique: true })
  googleCalendarEventId: string;

  @OneToMany(() => ScheduledCourseToEvent, scheduledCourseToEvent => scheduledCourseToEvent.event)
  scheduledCourseToEvents: ScheduledCourseToEvent[];

  @ManyToMany(() => Intern)
  @JoinTable({
    name: 'events_moderators',
    joinColumn: { name: 'event_id' },
    inverseJoinColumn: { name: 'intern_id' }
  })
  moderators: Intern[];
}
