import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { IntakeStageToIntern } from './intake-statge-to-intern.entity';

export enum IntakeStageType {
  INTORO_COURSES = 'Intro Courses',
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
  @Column({ name: 'stage_type', type: 'text', enum: IntakeStageType })
  stageType: IntakeStageType;

  @Column({ name: 'details', type: 'text' })
  details: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @ManyToOne(() => Intake, intake => intake.stages)
  intake: Intake;

  @OneToMany(() => IntakeStageToIntern, intakeStageToIntern => intakeStageToIntern.intakeStage)
  intakeStageToInterns: IntakeStageToIntern[];

  @ManyToMany(() => Event)
  @JoinTable({
    name: 'intake_stages_events',
    joinColumn: { name: 'intake_stage_id' },
    inverseJoinColumn: { name: 'event_id' }
  })
  events: Event[];
}
