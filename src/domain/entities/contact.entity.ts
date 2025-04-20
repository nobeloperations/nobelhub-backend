import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { SentEmail } from './sent-emaiil.entity';
import { ContactTag } from './contact-tag.entity';
import { OnlineEvent } from './online-event.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

  @Column({ name: 'email', type: 'text', unique: true })
  email: string;

  @Column({ name: 'country', type: 'text' })
  country: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'birth_date', type: 'date' })
  birthdate: Date;

  @Column({ name: 'timezone_name', type: 'text' })
  timezoneName: string;

  @Column({ name: 'mailing_subscription', type: 'boolean' })
  mailingSubscription: boolean;

  @OneToMany(() => SentEmail, sentEmail => sentEmail.contact)
  sentEmails: SentEmail[];

  @ManyToMany(() => ContactTag)
  @JoinTable({
    name: 'contacts_tags',
    joinColumn: { name: 'contact_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  tags: ContactTag[];

  @ManyToMany(() => OnlineEvent, onlineEvent => onlineEvent.contacts)
  events: OnlineEvent[];
}
