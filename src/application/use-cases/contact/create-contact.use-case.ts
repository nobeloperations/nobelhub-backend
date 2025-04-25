import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../../domain/entities/contact.entity';
import { CreateContactDto } from '../../dto/contact/create-contact.dto';

@Injectable()
export class CreateContactUseCase {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async execute(dto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(dto);
    return await this.contactRepository.save(contact);
  }
} 