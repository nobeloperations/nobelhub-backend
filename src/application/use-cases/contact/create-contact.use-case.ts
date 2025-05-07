import { Injectable, Inject } from '@nestjs/common';
import { CreateContactDto } from '../../api/dtos/contact/request/create-contact.dto';
import { Contact } from '../../../domain/entities/contact.entity';
import { ContactRepository } from '../../../infrastructure/database-service/postgres/repositories/contact.repository';

@Injectable()
export class CreateContactUseCase {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepository: ContactRepository
  ) {}

  async execute(dto: CreateContactDto): Promise<Contact> {
    const contact = CreateContactDto.toEntity(dto);
    return await this.contactRepository.save(contact);
  }
} 

