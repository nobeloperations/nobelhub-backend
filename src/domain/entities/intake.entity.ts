import { Entity, Column, OneToMany } from 'typeorm';

import { Intern } from './intern.entity';
import { BaseEntity } from './base.entity';
import { IntakeStage } from './intake-stage.entity';
import { IntakeStageToIntern } from './intake-statge-to-intern.entity';

export enum IntakeProgramType {
  WEEKEND = 'weekend',
  WEEKDAY = 'weekday'
}

@Entity('intakes')
export class Intake extends BaseEntity {
  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'application_deadline', type: 'date' })
  applicationDeadline: Date;

  @Column({ name: 'program_type', type: 'varchar', length: 10, enum: IntakeProgramType })
  programType: IntakeProgramType;

  @OneToMany(() => IntakeStage, stage => stage.intake)
  stages: IntakeStage[];

  @OneToMany(() => Intern, intern => intern.intake)
  interns: Intern[];

  @OneToMany(() => IntakeStageToIntern, intakeStageToIntern => intakeStageToIntern.intern)
  intakeStageToInterns: IntakeStageToIntern[];
}
