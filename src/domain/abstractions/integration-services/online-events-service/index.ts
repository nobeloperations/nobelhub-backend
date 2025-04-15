import { Contact } from '@domain/entities/contact.entity';
import { OnlineEvent } from '@domain/entities/online-event.entity';

export type WeekDays = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
export type RepeatPattern = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface RecurrenceOptions {
  endsOnDate?: Date;
  byDays?: WeekDays[];
  repeatInterval?: number;
  repeatPattern: RepeatPattern;
  endsAfterOccurrences?: number;
}

export abstract class OnlineEventsService {
  abstract CreateEvent(data: OnlineEvent, participants: Contact[]): Promise<OnlineEvent>;
  abstract DeleteEvent(event: OnlineEvent): Promise<OnlineEvent>;
  abstract UpdateEvent(event: OnlineEvent, participants: Contact[]): Promise<OnlineEvent>;
  abstract CreateRecurringMeetings(
    event: OnlineEvent,
    dates: { start: Date; end: Date }[],
    recurringOptions: RecurrenceOptions
  ): Promise<OnlineEvent[]>;
}
