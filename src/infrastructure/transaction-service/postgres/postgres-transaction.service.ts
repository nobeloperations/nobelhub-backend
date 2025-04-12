import {
  ITransaction,
  TransactionManagerService
} from '@domain/abstractions/integrations/transaction-service';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

class Transaction implements ITransaction<EntityManager> {
  constructor(private readonly entityManager: EntityManager) {}

  getManager(): EntityManager {
    return this.entityManager;
  }

  async execute<R>(operation: (context: EntityManager) => Promise<R>): Promise<R> {
    return operation(this.entityManager);
  }
}

@Injectable()
export class PostgresTransactionManagerService implements TransactionManagerService {
  constructor(private readonly dataSource: DataSource) {}

  async startTransaction<T>(clb: (tx: ITransaction<EntityManager>) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const transaction = new Transaction(queryRunner.manager);

    try {
      const result = await clb(transaction);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
