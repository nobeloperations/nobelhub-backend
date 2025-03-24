import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Intern } from './intern.entity';
import { Certificate } from './certificate.entity';

@Entity('scheduled_courses_interns')
export class ScheduledCourseToIntern {
  @PrimaryGeneratedColumn()
  public scheduledCourseToInternId: number;

  @Column()
  public internId: number;

  @Column()
  public schdeuledCourseId: number;

  @Column({ unique: true })
  public role: string;

  @ManyToOne(() => Intern, intern => intern.internToCertificates)
  public intern: Intern;

  @ManyToOne(() => Certificate, certificate => certificate.internToCertificates)
  public certificate: Certificate;
}
