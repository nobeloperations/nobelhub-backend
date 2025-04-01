import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('intern_tags')
export class InternTag extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 150 })
  description: string;
}
