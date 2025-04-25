import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from '../../services/contact.service';
import { CreateContactDto } from '../../dto/contact/create-contact.dto';
import { ContactResponseDto } from '../../dto/contact/contact-response.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactResponseDto> {
    return await this.contactService.createContact(createContactDto);
  }
} 