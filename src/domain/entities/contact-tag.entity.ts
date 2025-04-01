import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('contact_tags')
export class ContactTag extends BaseEntity {
  @Column({ name: 'name', type: 'text', unique: true })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;
}
