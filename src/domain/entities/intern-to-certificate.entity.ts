import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Intern } from './intern.entity';
import { Certificate } from './certificate.entity';

@Entity()
export class InternToCertificate {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public internId: number;

  @Column()
  public certificateId: number;

  @Column({ unique: true })
  public code: string;

  @ManyToOne(() => Intern, intern => intern.internToCertificates)
  public intern: Intern;

  @ManyToOne(() => Certificate, certificate => certificate.internToCertificates)
  public certificate: Certificate;
}
