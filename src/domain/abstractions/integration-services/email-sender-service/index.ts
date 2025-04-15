import { Contact } from '@domain/entities/contact.entity';
import { SentEmail } from '@domain/entities/sent-emaiil.entity';
import { EmailTemplate } from '@domain/entities/email-template.entity';

export interface EmailAttachment {
  filename: string;
  contentType: string;
  content: Buffer | string;
}

export abstract class EmailSenderService {
  abstract SendRawEmail(
    recipient: Contact,
    subject: string,
    body: string,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail>;

  abstract SendTemplateEmail(
    recipient: Contact,
    emailTemplate: EmailTemplate,
    context: Record<string, string>,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail>;

  abstract SendRawEmailBatch(
    recipients: Contact[],
    subject: string,
    body: string,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail[]>;

  abstract SendTemplateEmailBatch(
    recipients: Contact[],
    emailTemplate: EmailTemplate,
    contextPerRecipient?: Record<string, string>[],
    attachments?: EmailAttachment[]
  ): Promise<SentEmail[]>;
}
