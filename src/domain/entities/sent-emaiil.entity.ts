import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';
import { EmailTemplate } from './email-template.entity';

export enum EmailSendStatus {
  SUCCESS = 'success',
  FAILED = 'failed'
}

@Entity('sent_emails')
export class SentEmail extends BaseEntity {
  @ManyToOne(() => Contact, contact => contact.sentEmails)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ name: 'raw_body', type: 'text' })
  rawBody: string;

  @Column({ name: 'template_name', type: 'varchar', length: 100, nullable: true })
  template?: EmailTemplate;

  @Column({ name: 'context', type: 'json', nullable: true })
  context?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  attachments?: { filename: string; contentType?: string }[];

  @Column({
    name: 'send_status',
    type: 'enum',
    enum: EmailSendStatus,
    default: EmailSendStatus.SUCCESS
  })
  status: EmailSendStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage?: string;
}
