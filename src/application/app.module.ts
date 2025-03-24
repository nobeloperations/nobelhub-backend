import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

const entitiesPath = path.resolve(__dirname, '../domain/entities/*.{js,ts}');
console.log('Entities Path:', entitiesPath);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'postgres',
      entities: [entitiesPath],
      synchronize: true // TODO: Only for dev
    })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
