import { Entity, Column, ManyToMany, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { Intake } from './intake.entity';
import { Contact } from './contact.entity';
import { BaseEntity } from './base.entity';
import { InternToCertificate } from './intern-to-certificate.entity';
import { InternToScheduledCourse } from './intern-to-scheduled-course.entity';

@Entity('interns')
export class Intern extends BaseEntity {
  @Column({ name: 'teachable_id', type: 'text', unique: true })
  teachableId: string;

  @Column({ name: 'discrod_id', type: 'text', unique: true })
  discordId: string;

  @Column({ name: 'explorer_id', type: 'text', unique: true })
  explorerId: string;

  @Column({ name: 'explorer_password', type: 'text' })
  explorerPassword: string;

  @ManyToMany(() => Intake, intake => intake.interns)
  intake: Intake;

  @OneToMany(() => InternToCertificate, internToCertificate => internToCertificate.intern)
  internToCertificates: InternToCertificate[];

  @OneToOne(() => Contact)
  @JoinColumn()
  contact: Contact;

  @OneToMany(
    () => InternToScheduledCourse,
    internToScheduledCourse => internToScheduledCourse.scheduledCourse
  )
  internToScheduledCourses: InternToScheduledCourse[];
}
