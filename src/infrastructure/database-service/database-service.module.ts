import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Intake } from '@domain/entities/intake.entity';
import { DatabaseService } from '@domain/abstractions/integrations/database-service';

import { IntakeRepository } from './postgres/repositories/intake.repositoyry';
import { PostgresDatabaseService } from './postgres/postgres-database.service';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      entities: [path.resolve(__dirname, '../../domain/entities/*.{js,ts}')]
    }),
    TypeOrmModule.forFeature([Intake])
  ],
  providers: [
    {
      provide: DatabaseService,
      useClass: PostgresDatabaseService
    },
    IntakeRepository
  ],
  exports: [DatabaseService, IntakeRepository]
})
export class DatabaseServiceModule {}
