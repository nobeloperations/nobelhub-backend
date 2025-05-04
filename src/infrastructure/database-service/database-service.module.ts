import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Intake } from '@domain/entities/intake.entity';
import { Course } from '@domain/entities/course.entity';
import { IntakeStage } from '@domain/entities/intake-stage.entity';
import { Contact } from '@domain/entities/contact.entity';

import { DatabaseService } from '@domain/abstractions/integration-services';

import { IntakeRepository } from './postgres/repositories/intake.repositoyry';
import { IntakeStageRepository } from './postgres/repositories/intake-stage.repository';
import { ContactRepository } from './postgres/repositories/contact.repository';


import { CourseRespository } from './postgres/repositories/course.repository';    

import { PostgresDatabaseService }  from './postgres/postgres-database.service';
import { IntakeEventRepository } from './postgres/repositories/intake-event.repository';
import { IntakeEvent } from '@domain/entities/intake-event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      entities: [path.resolve(__dirname, '../../domain/entities/*.{js,ts}')]
    }),
    TypeOrmModule.forFeature([Intake, IntakeStage, IntakeEvent])
  ],
  providers: [
    {
      provide: DatabaseService,
      useClass: PostgresDatabaseService
    },
    IntakeRepository,
    CourseRespository,
    IntakeStageRepository,
    IntakeEventRepository,
    ContactRepository
  ],
  exports: [DatabaseService]
})
export class DatabaseServiceModule {}
