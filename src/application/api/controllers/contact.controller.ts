import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ContactService } from '../../services/contact.service';
import { CreateContactDto } from '../../api/dtos/contact/request/create-contact.dto';
import { UpdateContactDto } from '../../api/dtos/contact/request/update-contact.dto';
import { ContactResponseDto } from '../../api/dtos/contact/response/contact-response.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactResponseDto> {
    return await this.contactService.createContact(createContactDto);
  }

  @Get()
  async getAllContacts(): Promise<ContactResponseDto[]> {
    return await this.contactService.getAllContacts();
  }

  @Get(':id')
  async getContactById(
    @Param('id') id: string,
  ): Promise<ContactResponseDto> {
    return await this.contactService.getContactById(id);
  }

  @Put(':id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<ContactResponseDto> {
    return await this.contactService.updateContact(id, updateContactDto);
  }

  @Delete(':id')
  async deleteContact(
    @Param('id') id: string,
  ): Promise<void> {
    return await this.contactService.deleteContact(id);
  }
} 