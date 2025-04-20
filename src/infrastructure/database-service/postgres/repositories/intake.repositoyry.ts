import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Intake } from '@domain/entities/intake.entity';
import { ITransaction } from '@domain/abstractions/integration-services';
import IIntakeRepository from '@domain/abstractions/integration-services/database-service/repositories/intake.abstract-repository';
import { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

@Injectable()
export class IntakeRepository implements IIntakeRepository {
  constructor(
    @InjectRepository(Intake)
    private readonly _repo: Repository<Intake>
  ) {}

  private getManager(tx?: ITransaction<EntityManager>) {
    return tx ? tx.getManager() : this._repo.manager;
  }

  public async CreateRecord(data: Intake, tx?: ITransaction<EntityManager>) {
    return this.getManager(tx).save(Intake, data);
  }

  public async GetRecordById(id: number, tx?: ITransaction<EntityManager>) {
    return this.getManager(tx).findOne(Intake, { where: { id } });
  }

  public async UpdateRecordById(
    id: number,
    data: Omit<Intake, 'id'>,
    tx?: ITransaction<EntityManager>
  ) {
    const manager = this.getManager(tx);
    const intake = await manager.findOne(Intake, { where: { id } });
    return intake ? manager.save(Object.assign(intake, data)) : null;
  }

  public async DeleteRecordById(id: number, tx?: ITransaction<EntityManager>) {
    const manager = this.getManager(tx);
    const intake = await manager.findOne(Intake, { where: { id } });
    if (intake) await manager.delete(Intake, id);
    return intake;
  }

  public async GetRecordsList(filterOptions: FilterQueryOptions<Intake>) {
    const { search, filters, sortBy, order, page, limit } = filterOptions;

    const queryBuilder = this._repo.createQueryBuilder('intake');

    if (search) {
      queryBuilder.andWhere('intake.name ILIKE :search', { search: `%${search}%` });
    }

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof Intake];
        if (value !== undefined) {
          queryBuilder.andWhere(`intake.${key} = :${key}`, { [key]: value });
        }
      });
    }

    if (sortBy && order) {
      queryBuilder.orderBy(`intake.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      queryBuilder.skip(offset).take(limit);
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      pagination: {
        page,
        total,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
