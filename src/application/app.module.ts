import { Module } from '@nestjs/common';

import { ContactController } from './controllers/contact.controller';

import { ContactUseCases } from '@domain/use-cases/contact.use-cases';

import { IntakeUseCases } from '@domain/use-cases/intake.use-cases';

import { IntakeController } from './controllers/intake.controller';

import { DatabaseServiceModule } from '@infrastructure/database-service/database-service.module';
import { TransactionManagerModule } from '@infrastructure/transaction-service/transaction-service.module';

@Module({
  imports: [DatabaseServiceModule, TransactionManagerModule],
  controllers: [IntakeController, ContactController],
  providers: [IntakeUseCases, ContactUseCases],
 
})
export class AppModule {}
