import { Module } from '@nestjs/common';

import { IntakeUseCases } from '@application/use-cases/intake.use-cases';

import { IntakeController } from './api/controllers/intake.controller';

import { DatabaseServiceModule } from '@infrastructure/database-service/database-service.module';
import { TransactionManagerModule } from '@infrastructure/transaction-service/transaction-service.module';
import { OnlineEventsServiceModule } from '@infrastructure/online-events-service/online-events-service.module';

@Module({
  imports: [DatabaseServiceModule, TransactionManagerModule, OnlineEventsServiceModule],
  controllers: [IntakeController],
  providers: [IntakeUseCases]
})
export class AppModule {}
