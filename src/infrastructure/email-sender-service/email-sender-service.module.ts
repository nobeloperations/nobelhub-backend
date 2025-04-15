import { Module } from '@nestjs/common';

import { EmailSenderService } from '@domain/abstractions/integration-services/email-sender-service';

import { AwsEmailService } from '../email-sender-service/aws-ses/aws-email.service';

@Module({
  providers: [
    {
      provide: EmailSenderService,
      useClass: AwsEmailService
    },
    AwsEmailService
  ],
  exports: [EmailSenderService]
})
export class OnlineEventsServiceModule {}
