import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IntakeController } from './api/controllers/intake.controller';

import { DatabaseServiceModule } from '@infrastructure/database-service/database-service.module';
import { TransactionManagerModule } from '@infrastructure/transaction-service/transaction-service.module';
import { OnlineEventsServiceModule } from '@infrastructure/online-events-service/online-events-service.module';
import { EmailSenderServiceModule } from '@infrastructure/email-sender-service/email-sender-service.module';

import { IntakeScheduleGenerator } from './services';
import { CreateIntakeUseCase } from './use-cases/intake/create-intake.use-case';
import { GetIntakesListUseCase } from './use-cases/intake/get-intakes-list.use-case';
import { GetTargetIntakeUseCase } from './use-cases/intake/get-target-intake.use-case';
import { DeleteIntakeUseCase } from './use-cases/intake/delete-intake.use-case';
import { GetIntakeStagesUseCase } from './use-cases/intake/get-intake-stages.use-case';
import { IntakeStageController } from './api/controllers/intake-stage.controller';
import { GetIntakeStageEvents } from './use-cases/intake-stage/get-stage-events.use-case';

@Module({
  imports: [
    DatabaseServiceModule,
    TransactionManagerModule,
    OnlineEventsServiceModule,
    EmailSenderServiceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  controllers: [IntakeController, IntakeStageController],
  providers: [
    CreateIntakeUseCase,
    IntakeScheduleGenerator,
    GetIntakesListUseCase,
    GetTargetIntakeUseCase,
    DeleteIntakeUseCase,
    GetIntakeStagesUseCase,
    GetIntakeStageEvents
  ]
})
export class AppModule {}
