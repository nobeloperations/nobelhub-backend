import { Injectable } from '@nestjs/common';
import { CreateContactUseCase } from '../use-cases/contact/create-contact.use-case';
import { CreateContactDto } from '../dto/contact/create-contact.dto';
import { Contact } from '../../domain/entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    private readonly createContactUseCase: CreateContactUseCase,
  ) {}

  async createContact(dto: CreateContactDto): Promise<Contact> {
    return await this.createContactUseCase.execute(dto);
  }
} 