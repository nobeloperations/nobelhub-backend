import { JWT } from 'google-auth-library';
import { google, calendar_v3 } from 'googleapis';

import { OnlineEvent } from '@domain/entities/online-event.entity';
import {
  OnlineEventsService,
  RecurrenceOptions
} from '@domain/abstractions/integration-services/online-events-service';

export class GoogleCalendarService implements OnlineEventsService {
  private calendar: calendar_v3.Calendar;

  constructor() {
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: 'nikita.k@nobelcoaching.com'
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  private buildRecurrenceRule(options: RecurrenceOptions): string {
    const ruleParts = [
      `FREQ=${options.repeatPattern}`,
      options.repeatInterval && options.repeatInterval !== 1
        ? `INTERVAL=${options.repeatInterval}`
        : '',
      options.byDays?.length ? `BYDAY=${options.byDays.join(',')}` : '',
      options.endsAfterOccurrences ? `COUNT=${options.endsAfterOccurrences}` : '',
      options.endsOnDate ? `UNTIL=${options.endsOnDate.toISOString().split('T')[0]}` : ''
    ].filter(Boolean);

    return `RRULE:${ruleParts.join(';')}`;
  }

  private buildEventRequestBody(
    event: OnlineEvent,
    start: string,
    end: string,
    recurrence?: string[]
  ): calendar_v3.Schema$Event {
    return {
      summary: event.title,
      description: event.description,
      start: { dateTime: start, timeZone: 'UTC' },
      end: { dateTime: end, timeZone: 'UTC' },
      attendees: event.contacts.map(contact => ({ email: contact.email })),
      recurrence,
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      }
    };
  }

  async CreateEvent(event: OnlineEvent): Promise<OnlineEvent> {
    const res = await this.calendar.events.insert({
      calendarId: 'nikita.k@nobelcoaching.com',
      requestBody: this.buildEventRequestBody(
        event,
        event.startDate.toISOString(),
        event.endDate.toISOString()
      ),
      conferenceDataVersion: 1
    });

    return { ...event, meetingLink: res.data.hangoutLink, eventIdentifier: res.data.id };
  }

  async UpdateEvent(event: OnlineEvent): Promise<OnlineEvent> {
    const res = await this.calendar.events.update({
      calendarId: 'nikita.k@nobelcoaching.com',
      eventId: event.eventIdentifier,
      requestBody: this.buildEventRequestBody(
        event,
        event.startDate.toISOString(),
        event.endDate.toISOString()
      )
    });

    return { ...event, meetingLink: res.data.hangoutLink, eventIdentifier: res.data.id };
  }

  async DeleteEvent(event: OnlineEvent): Promise<OnlineEvent> {
    await this.calendar.events.delete({
      calendarId: 'nikita.k@nobelcoaching.com',
      eventId: event.eventIdentifier
    });

    return { ...event };
  }

  async CreateRecurringMeetings(
    event: OnlineEvent,
    dates: { start: Date; end: Date }[],
    recurringOptions: RecurrenceOptions
  ): Promise<OnlineEvent[]> {
    const createdEvents: OnlineEvent[] = [];
    const calendarId = 'nikita.k@nobelcoaching.com';
    const recurrenceRule = this.buildRecurrenceRule(recurringOptions);

    for (const { start, end } of dates) {
      const res = await this.calendar.events.insert({
        calendarId,
        requestBody: this.buildEventRequestBody(event, start.toISOString(), end.toISOString(), [
          recurrenceRule
        ])
      });

      createdEvents.push({
        ...event,
        meetingLink: res.data.hangoutLink,
        eventIdentifier: res.data.id
      });
    }

    return createdEvents;
  }
}
