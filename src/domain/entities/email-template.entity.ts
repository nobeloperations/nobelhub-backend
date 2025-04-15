import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('email_templates')
export class EmailTemplate extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'subject', type: 'text' })
  subject: string;

  @Column({ name: 'html_body', type: 'text' })
  htmlBody: string;

  @Column({ name: 'text_body', type: 'text', nullable: true })
  textBody?: string;
}
