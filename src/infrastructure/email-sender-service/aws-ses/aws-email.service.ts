import { Contact } from '@domain/entities/contact.entity';
import { SentEmail, EmailSendStatus } from '@domain/entities/sent-emaiil.entity';
import { EmailTemplate } from '@domain/entities/email-template.entity';

import {
  EmailAttachment,
  EmailSenderService
} from '@domain/abstractions/integration-services/email-sender-service';

import R from 'ramda';
import * as MailComposer from 'nodemailer/lib/mail-composer';
import { SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: 'us-east-1' });

export class AwsEmailService implements EmailSenderService {
  private substituteTemplatePlaceholders(
    templateText: string,
    context: Record<string, string>
  ): string {
    return templateText.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] || '');
  }

  private async buildMimeEmail(
    from: string,
    to: string,
    subject: string,
    htmlBody: string,
    attachments?: EmailAttachment[]
  ): Promise<Buffer> {
    const mail = new MailComposer({
      from,
      to,
      subject,
      html: htmlBody,
      attachments: attachments?.map(att => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType
      }))
    });

    return await new Promise((resolve, reject) =>
      mail.compile().build((err, message) => (err ? reject(err) : resolve(message)))
    );
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
      const rawMessage = await this.buildMimeEmail(
        'noreply@yourdomain.com',
        recipient.email,
        subject,
        body,
        attachments
      );

      await sesClient.send(new SendRawEmailCommand({ RawMessage: { Data: rawMessage } }));
    } catch (error) {
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
    const chunkSize = 5;
    const delayBetweenChunksInMs = 1000;

    const sentEmails: SentEmail[] = [];
    const chunks: Contact[][] = R.splitEvery(chunkSize, recipients);

    for (const contactsChunk of chunks) {
      const results = await Promise.all(
        contactsChunk.map(recipient => this.SendRawEmail(recipient, subject, body, attachments))
      );

      sentEmails.push(...results);

      if (contactsChunk !== chunks[chunks.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenChunksInMs));
      }
    }

    return sentEmails;
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
    emailTemplate: EmailTemplate,
    contextPerRecipient?: Record<string, string>[],
    attachments?: EmailAttachment[]
  ): Promise<SentEmail[]> {
    return Promise.all(
      recipients.map((recipient, index) => {
        const context = contextPerRecipient?.[index] || {};
        return this.SendTemplateEmail(recipient, emailTemplate, context, attachments);
      })
    );
  }
}
