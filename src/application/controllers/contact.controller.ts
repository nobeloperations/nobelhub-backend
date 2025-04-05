import { Controller, Param, Body, Get, Post, Put, Delete, Query } from '@nestjs/common';

import { Contact } from '@domain/entities/contact.entity';
import { ContactUseCases } from '@domain/use-cases/contact.use-cases';
import { CreateContactDto, UpdateContactDto, FilterContactDto } from '@application/dtos';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';

@Controller('contacts')
export class ContactController {
  constructor(private readonly _contactUseCases: ContactUseCases) {}

  @Post()
  async CreateContact(@Body() requestedContactData: CreateContactDto) {
    const contactData = CreateContactDto.toEntity(requestedContactData);
    return await this._contactUseCases.CreateContact(contactData);
  }

  @Get()
  async GetContactsList(@Query() query: FilterContactDto) {
    const filterOptions: FilterQueryOptions<Contact> = {
      search: query.search,
      filters: { country: query.country },
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? 'id',
      order: query.order ?? 'asc',
    };

    return await this._contactUseCases.GetContactsList(filterOptions);
  }

  @Get(':id')
  async GetContactById(@Param('id') id: number) {
    return await this._contactUseCases.GetContactById(id);
  }

  @Put(':id')
  async UpdateContact(@Param('id') id: number, @Body() requestedContactData: UpdateContactDto) {
    const contactData = UpdateContactDto.toEntity(requestedContactData);
    return await this._contactUseCases.UpdateContactById(id, contactData);
  }

  @Delete(':id')
  async DeleteContact(@Param('id') id: number) {
    return await this._contactUseCases.DeleteContactById(id);
  }
}