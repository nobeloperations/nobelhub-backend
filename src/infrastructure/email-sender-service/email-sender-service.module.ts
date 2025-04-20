import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EmailSenderService } from '@domain/abstractions/integration-services';

import { AwsEmailService } from '../email-sender-service/aws-ses/aws-email.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EmailSenderService,
      useClass: AwsEmailService
    },
    AwsEmailService
  ],
  exports: [EmailSenderService]
})
export class EmailSenderServiceModule {}
