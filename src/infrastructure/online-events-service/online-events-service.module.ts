import { Module } from '@nestjs/common';

import { OnlineEventsService } from '@domain/abstractions/integration-services/online-events-service';

import { GoogleCalendarService } from './google-calendar/google-calendar.service';

@Module({
  providers: [
    {
      provide: OnlineEventsService,
      useClass: GoogleCalendarService
    },
    GoogleCalendarService
  ],
  exports: [OnlineEventsService]
})
export class OnlineEventsServiceModule {}
