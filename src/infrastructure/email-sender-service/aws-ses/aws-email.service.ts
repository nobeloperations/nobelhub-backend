import * as R from 'ramda';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Contact } from '@domain/entities/contact.entity';
import { EmailTemplate } from '@domain/entities/email-template.entity';
import { SentEmail, EmailSendStatus } from '@domain/entities/sent-emaiil.entity';

import { EmailSenderService, EmailAttachment } from '@domain/abstractions/integration-services';

@Injectable()
export class AwsEmailService implements EmailSenderService {
  private readonly CHUNK_SIZE = 5;
  private readonly DELAY_BETWEEN_CHUNKS_MS = 1000;

  private readonly transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_SMTP_HOST'),
      port: this.configService.get<number>('EMAIL_SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('AWS_SES_SMTP_USER'),
        pass: this.configService.get<string>('AWS_SES_SMTP_PASSWORD')
      }
    });
  }

  private substituteTemplatePlaceholders(
    templateText: string,
    context: Record<string, string>
  ): string {
    return templateText.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? '');
  }

  private async sendInChunks(
    contacts: Contact[],
    handler: (contact: Contact, index: number) => Promise<SentEmail>
  ): Promise<SentEmail[]> {
    const sentEmails: SentEmail[] = [];
    const chunks = R.splitEvery(this.CHUNK_SIZE, contacts);

    for (const [chunkIndex, chunk] of chunks.entries()) {
      const results = await Promise.all(
        chunk.map((contact, index) => handler(contact, chunkIndex * this.CHUNK_SIZE + index))
      );

      sentEmails.push(...results);

      if (chunkIndex < chunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, this.DELAY_BETWEEN_CHUNKS_MS));
      }
    }

    return sentEmails;
  }

  async SendRawEmail(
    recipient: Contact,
    subject: string,
    body: string,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail> {
    const sentEmail = new SentEmail();

    sentEmail.rawBody = body;
    sentEmail.subject = subject;
    sentEmail.contact = recipient;
    sentEmail.attachments = attachments;
    sentEmail.status = EmailSendStatus.SUCCESS;

    try {
      await this.transporter.sendMail({
        from: 'community@nobelhub.com',
        to: recipient.email,
        subject,
        html: body,
        attachments: attachments?.map(att => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType
        }))
      });
    } catch (error: any) {
      sentEmail.status = EmailSendStatus.FAILED;
      sentEmail.errorMessage = error?.message ?? 'Unknown error';
    }

    return sentEmail;
  }

  async SendRawEmailBatch(
    recipients: Contact[],
    subject: string,
    body: string,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail[]> {
    return this.sendInChunks(recipients, async recipient =>
      this.SendRawEmail(recipient, subject, body, attachments)
    );
  }

  async SendTemplateEmail(
    recipient: Contact,
    emailTemplate: EmailTemplate,
    context: Record<string, string>,
    attachments?: EmailAttachment[]
  ): Promise<SentEmail> {
    const body = this.substituteTemplatePlaceholders(emailTemplate.htmlBody, context);
    const subject = this.substituteTemplatePlaceholders(emailTemplate.subject, context);

    return this.SendRawEmail(recipient, subject, body, attachments);
  }

  async SendTemplateEmailBatch(
    recipients: Contact[],
    template: EmailTemplate,
    contextPerRecipient: Record<string, string>[] = [],
    attachments?: EmailAttachment[]
  ): Promise<SentEmail[]> {
    return this.sendInChunks(recipients, async (recipient, index) => {
      const context = contextPerRecipient[index] ?? {};

      return this.SendTemplateEmail(recipient, template, context, attachments);
    });
  }
}
