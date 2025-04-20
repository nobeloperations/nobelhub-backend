import { Module } from '@nestjs/common';

import { TransactionManagerService } from '@domain/abstractions/integration-services';

import { PostgresTransactionManagerService } from './postgres/postgres-transaction.service';

@Module({
  providers: [
    {
      provide: TransactionManagerService,
      useClass: PostgresTransactionManagerService
    },
    PostgresTransactionManagerService
  ],
  exports: [TransactionManagerService, PostgresTransactionManagerService]
})
export class TransactionManagerModule {}
