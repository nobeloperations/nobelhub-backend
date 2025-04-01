import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Event } from './event.entity';
import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { InternTag } from './intern-tag.entity';
import { InternToCertificate } from './intern-to-certificate.entity';
import { InternToScheduledCourse } from './intern-to-scheduled-course.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

@Entity('interns')
export class Intern extends BaseEntity {
  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

  @Column({ name: 'email', type: 'text' })
  email: string;

  @Column({ name: 'country', type: 'text' })
  country: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'birth_date', type: 'date' })
  birthdate: Date;

  @Column({ name: 'timezone', type: 'text' })
  timezone: string;

  @Column({ name: 'teachable_id', type: 'text', unique: true })
  teachableId: string;

  @Column({ name: 'discrod_id', type: 'text', unique: true })
  discordId: string;

  @ManyToMany(() => Intake, intake => intake.interns)
  intake: Intake;

  @OneToMany(() => InternToCertificate, internToCertificate => internToCertificate.intern)
  internToCertificates: InternToCertificate[];

  @OneToMany(
    () => InternToScheduledCourse,
    internToScheduledCourse => internToScheduledCourse.scheduledCourse
  )
  internToScheduledCourses: InternToScheduledCourse[];

  @ManyToMany(() => Event)
  @JoinTable({
    name: 'interns_events',
    joinColumn: { name: 'intern_id' },
    inverseJoinColumn: { name: 'event_id' }
  })
  events: Event[];

  @ManyToMany(() => InternTag)
  @JoinTable({
    name: 'interns_tags',
    joinColumn: { name: 'intern_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  tags: InternTag[];
}
