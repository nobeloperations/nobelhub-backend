import { Entity, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';
import { ScheduledCourseToEvent } from './scheduled-course-to-event';

@Entity('online_events')
export class OnlineEvent extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 75 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  description: string;

  @Column({ name: 'meeting_link', type: 'varchar', length: 100 })
  meetingLink: string;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'event_identifier', type: 'text', unique: true })
  eventIdentifier: string;

  @ManyToMany(() => Contact)
  @JoinTable({
    name: 'contacts_events',
    joinColumn: { name: 'event_id' },
    inverseJoinColumn: { name: 'contact_id' }
  })
  contacts: Contact[];

  @OneToMany(() => ScheduledCourseToEvent, scheduledCourseToEvent => scheduledCourseToEvent.event)
  scheduledCourseToEvents: ScheduledCourseToEvent[];
}
