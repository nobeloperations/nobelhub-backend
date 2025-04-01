import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Intake } from './intake.entity';
import { BaseEntity } from './base.entity';
import { Event } from './event.entity';
import { IntakeStageToIntern } from './intake-statge-to-intern.entity';

@Entity('intake_stages')
export class IntakeStage extends BaseEntity {
  @Column({ name: 'name', type: 'text' })
  name: string;

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

  @ManyToMany(() => Event)
  @JoinTable({
    name: 'intake_stages_events',
    joinColumn: { name: 'intake_stage_id' },
    inverseJoinColumn: { name: 'event_id' }
  })
  events: Event[];
}
