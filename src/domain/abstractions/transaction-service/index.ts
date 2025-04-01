export interface ITransaction<T = unknown> {
  getManager(): T;
  execute<R>(operation: (context: T) => Promise<R>): Promise<R>;
}

export abstract class TransactionManagerService {
  abstract startTransaction<T>(clb: (tx: ITransaction) => Promise<T>): Promise<T>;
}
