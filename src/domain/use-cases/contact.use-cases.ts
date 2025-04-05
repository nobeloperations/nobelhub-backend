import { Injectable } from '@nestjs/common';

import { Contact } from '@domain/entities/contact.entity';
import { DatabaseService } from '@domain/abstractions/database-service';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';

@Injectable()
export class ContactUseCases {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async CreateContact(contactData: Contact): Promise<Contact> {
    // Validate or process contact data if needed
    return await this._databaseService.contact.createRecord(contactData);
  }

  public async GetContactById(id: number): Promise<Contact> {
    return await this._databaseService.contact.getRecordById(id);
  }

  public async GetContactsList(filterOptions: FilterQueryOptions<Contact>): Promise<Contact[]> {
    return await this._databaseService.contact.getRecordsList(filterOptions);
  }

  public async UpdateContactById(id: number, contactData: Contact): Promise<Contact> {
    return await this._databaseService.contact.updateRecordById(id, contactData);
  }

  public async DeleteContactById(id: number): Promise<void> {
    await this._databaseService.contact.deleteRecordById(id);
  }
}