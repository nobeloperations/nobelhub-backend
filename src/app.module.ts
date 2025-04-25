import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseServiceModule } from './infrastructure/database-service/database-service.module';
import { ContactModule } from './application/api/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseServiceModule,
    ContactModule
  ],
})
export class AppModule {} 