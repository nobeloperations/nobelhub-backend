import { Contact } from '@domain/entities/contact.entity';

export class CreateContactDto {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  gender: string;
  birthdate: Date;
  timezoneName: string;
  mailingSubscription: boolean;

  static toEntity(dto: CreateContactDto): Contact {
    const contact = new Contact();
    contact.firstName = dto.firstName;
    contact.lastName = dto.lastName;
    contact.email = dto.email;
    contact.country = dto.country;
    contact.gender = dto.gender;
    contact.birthdate = dto.birthdate;
    contact.timezoneName = dto.timezoneName;
    contact.mailingSubscription = dto.mailingSubscription;
    return contact;
  }
}