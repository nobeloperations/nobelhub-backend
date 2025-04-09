import { Module } from '@nestjs/common';

import { IntakeUseCases } from '@domain/use-cases/intake.use-cases';

import { IntakeController } from './controllers/intake.controller';
import { CourseController } from './controllers/course.controller';
import { CourseUseCases } from '@domain/use-cases/course.use-case';
import { DatabaseServiceModule } from '@infrastructure/database-service/database-service.module';
import { TransactionManagerModule } from '@infrastructure/transaction-service/transaction-service.module';

@Module({
  imports: [DatabaseServiceModule, TransactionManagerModule],
  controllers: [IntakeController, CourseController],
  providers: [IntakeUseCases, CourseUseCases],
})
export class AppModule {}
