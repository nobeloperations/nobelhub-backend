import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Intake } from '@domain/entities/intake.entity';
import { IntakeStage } from '@domain/entities/intake-stage.entity';

import { DatabaseService } from '@domain/abstractions/integration-services';

import { IntakeRepository } from './postgres/repositories/intake.repositoyry';
import { IntakeStageRepository } from './postgres/repositories/intake-stage.repository';

import { PostgresDatabaseService } from './postgres/postgres-database.service';
import { IntakeEventRepository } from './postgres/repositories/intake-event.repository';
import { IntakeEvent } from '@domain/entities/intake-event.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [path.resolve(__dirname, '../../domain/entities/*.{js,ts}')]
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Intake, IntakeStage, IntakeEvent])
  ],
  providers: [
    {
      provide: DatabaseService,
      useClass: PostgresDatabaseService
    },
    IntakeRepository,
    IntakeStageRepository,
    IntakeEventRepository
  ],
  exports: [DatabaseService]
})
export class DatabaseServiceModule {}
