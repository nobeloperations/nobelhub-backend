import { Module } from '@nestjs/common';

import { IntakeUseCases } from '@domain/use-cases/intake.use-cases';

import { IntakeController } from './controllers/intake.controller';
<<<<<<< HEAD
import { CourseController } from './controllers/course.controller';
import { CourseUseCases } from '@domain/use-cases/course.use-case';
=======

>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
import { DatabaseServiceModule } from '@infrastructure/database-service/database-service.module';
import { TransactionManagerModule } from '@infrastructure/transaction-service/transaction-service.module';

@Module({
  imports: [DatabaseServiceModule, TransactionManagerModule],
<<<<<<< HEAD
  controllers: [IntakeController, CourseController],
  providers: [IntakeUseCases, CourseUseCases],
=======
  controllers: [IntakeController],
  providers: [IntakeUseCases]
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
})
export class AppModule {}
