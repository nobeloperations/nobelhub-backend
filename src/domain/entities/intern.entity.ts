import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';

import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { InternToCertificate } from './intern-to-certificate.entity';
import { InternToScheduledCourse } from './intern-to-scheduled-course.entity';

@Entity('interns')
export class Intern extends BaseEntity {
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
}
