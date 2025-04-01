import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { InternToCertificate } from './intern-to-certificate.entity';

@Entity('certificates')
export class Certificate extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'resource_link', type: 'text', unique: true })
  resourceLink: string;

  @OneToMany(() => InternToCertificate, internToCertificate => internToCertificate.certificate)
  internToCertificates: InternToCertificate[];
}
