import { Injectable, Inject } from '@nestjs/common';
import { CreateContactDto } from '../api/dtos/contact/request/create-contact.dto';
import { UpdateContactDto } from '../api/dtos/contact/request/update-contact.dto';
import { ContactResponseDto } from '../api/dtos/contact/response/contact-response.dto';
import { CreateContactUseCase } from '../use-cases/contact/create-contact.use-case';
import { ContactRepository } from '../../infrastructure/database-service/postgres/repositories/contact.repository';
import { Contact } from '../domain/entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    private readonly createContactUseCase: CreateContactUseCase,
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<ContactResponseDto> {
    const contact = await this.createContactUseCase.execute(createContactDto);
    return ContactResponseDto.fromEntity(contact);
  }

  async getAllContacts(): Promise<ContactResponseDto[]> {
    const contacts = await this.contactRepository.find();
    return contacts.map(contact => ContactResponseDto.fromEntity(contact));
  }

  async getContactById(id: string): Promise<ContactResponseDto> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return ContactResponseDto.fromEntity(contact);
  }

  async updateContact(id: string, updateContactDto: UpdateContactDto): Promise<ContactResponseDto> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contact not found');
    }

    const updatedContact = Object.assign(contact, updateContactDto);
    await this.contactRepository.save(updatedContact);
    return ContactResponseDto.fromEntity(updatedContact);
  }

  async deleteContact(id: string): Promise<void> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error('Contact not found');
    }
    await this.contactRepository.remove(contact);
  }
} 