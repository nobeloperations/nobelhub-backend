import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Intern } from './intern.entity';
import { IntakeStage } from './intake-stage.entity';

@Entity('intake_stages_interns')
export class IntakeStageToIntern {
  @PrimaryGeneratedColumn()
  public intakeStageToInternId: number;

  @Column()
  public internId: number;

  @Column()
  public intakeStageId: number;

  @Column({ type: 'date' })
  public complteAt: Date;

  @ManyToOne(() => Intern, intern => intern.internToCertificates)
  public intern: Intern;

  @ManyToOne(() => IntakeStage, intakeStage => intakeStage.intakeStageToInterns)
  public intakeStage: IntakeStage;
}
