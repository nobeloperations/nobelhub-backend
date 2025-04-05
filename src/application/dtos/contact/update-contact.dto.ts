import { Contact } from '@domain/entities/contact.entity';

export class UpdateContactDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  gender?: string;
  birthdate?: Date;
  timezoneName?: string;
  mailingSubscription?: boolean;

  static toEntity(dto: UpdateContactDto): Contact {
    const contact = new Contact();
    if (dto.firstName) contact.firstName = dto.firstName;
    if (dto.lastName) contact.lastName = dto.lastName;
    if (dto.email) contact.email = dto.email;
    if (dto.country) contact.country = dto.country;
    if (dto.gender) contact.gender = dto.gender;
    if (dto.birthdate) contact.birthdate = dto.birthdate;
    if (dto.timezoneName) contact.timezoneName = dto.timezoneName;
    if (dto.mailingSubscription !== undefined) contact.mailingSubscription = dto.mailingSubscription;
    return contact;
  }
}