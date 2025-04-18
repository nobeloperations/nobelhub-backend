import { Entity, Column, OneToMany } from 'typeorm';

import { Intern } from './intern.entity';
import { BaseEntity } from './base.entity';
import { IntakeStage } from './intake-stage.entity';
import { ScheduledCourse } from './scheduled-course.entity';
import { IntakeStageToIntern } from './intake-statge-to-intern.entity';

export enum IntakeProgramType {
  WEEKEND = 'Weekend',
  WEEKDAY = 'Weekday'
}

@Entity('intakes')
export class Intake extends BaseEntity {
  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'application_deadline', type: 'date' })
  applicationDeadline: Date;

  @Column({ name: 'program_type', type: 'varchar', length: 10, enum: IntakeProgramType })
  programType: IntakeProgramType;

  @OneToMany(() => IntakeStage, stage => stage.intake, { onDelete: 'CASCADE' })
  stages: IntakeStage[];

  @OneToMany(() => Intern, intern => intern.intake)
  interns: Intern[];

  @OneToMany(() => ScheduledCourse, scheduledCourses => scheduledCourses.intake)
  scheduledCourses: ScheduledCourse[];

  @OneToMany(() => IntakeStageToIntern, intakeStageToIntern => intakeStageToIntern.intern)
  intakeStageToInterns: IntakeStageToIntern[];
}
