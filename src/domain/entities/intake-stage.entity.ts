import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { IntakeEvent } from './intake-event.entity';
import { IntakeStageToIntern } from './intake-statge-to-intern.entity';

export enum IntakeStageName {
  GUIDANCE = 'Guidance',
  INTORO_COURSES = 'Intro Courses',
  CAPSTONE_PROJECT = 'Capstone Project',
  ADVANCED_LEADERSHIP = 'Advanced Leadership',
  INTERNSHIP_ONBOARDING = 'Internship Onboarding',
  INTERNSHIP_INITIATION = 'Internship Initiation',
  LEADERSHIP_FOUNDATIONS = 'Leadership Foundations',
  LEADERSHIP_PRACTICE_BIT = 'Leadership Practice BIT',
  LEADERSHIP_PRACTICE_PAP = 'Leadership Practice PAP',
  LEADERSHIP_PRACTICE_IWD = 'Leadership Practice IWD'
}

@Entity('intake_stages')
export class IntakeStage extends BaseEntity {
  @Column({ name: 'stage_type', type: 'text', enum: IntakeStageName })
  name: IntakeStageName;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @ManyToOne(() => Intake, intake => intake.stages)
  intake: Intake;

  @OneToMany(() => IntakeStageToIntern, intakeStageToIntern => intakeStageToIntern.intakeStage)
  intakeStageToInterns: IntakeStageToIntern[];

  @OneToMany(() => IntakeEvent, intakeEvent => intakeEvent.stage, { cascade: true })
  events: IntakeEvent[];
}
