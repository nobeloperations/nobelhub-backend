export abstract class MailService {
  abstract sendMail(
    to: string,
    subject: string,
    body: string,
    attachments?: Buffer[]
  ): Promise<void>;

  abstract scheduleMail(
    to: string,
    subject: string,
    body: string,
    sendAt: Date,
    attachments?: Buffer[]
  ): Promise<void>;

  abstract validateEmailAddress(email: string): boolean;

  abstract sendBulkMail(
    to: string[],
    subject: string,
    body: string,
    attachments?: Buffer[]
  ): Promise<void>;
}
