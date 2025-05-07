import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../domain/entities/contact.entity';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from '../services/contact.service';
import { CreateContactUseCase } from '../use-cases/contact/create-contact.use-case';
import { ContactRepository } from '../../infrastructure/database-service/postgres/repositories/contact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [ContactController],
  providers: [
    ContactService,
    CreateContactUseCase,
    {
      provide: 'ContactRepository',
      useClass: ContactRepository,
    }
  ],
  exports: [ContactService]
})
export class ContactModule {} 