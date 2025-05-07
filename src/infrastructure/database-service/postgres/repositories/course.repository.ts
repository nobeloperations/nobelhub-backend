import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Course } from '@domain/entities/course.entity';
import { ITransaction } from '@domain/abstractions/integration-services';
import ICourseRepository from '@domain/abstractions/integration-services/database-service/repositories/course.abstract-repository';
import { FilterQueryOptions } from '@domain/abstractions/integration-services/database-service/query-options/filter.query-options';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly _repo: Repository<Course>
  ) {}

  private getManager(tx?: ITransaction<EntityManager>) {
    return tx ? tx.getManager() : this._repo.manager;
  }

  public async CreateRecord(data: Course, tx?: ITransaction<EntityManager>) {
    return this.getManager(tx).save(Course, data);
  }

  public async GetRecordById(id: number, tx?: ITransaction<EntityManager>) {
    return this.getManager(tx).findOne(Course, { where: { id } });
  }

  public async UpdateRecordById(
    id: number,
    data: Omit<Course, 'id'>,
    tx?: ITransaction<EntityManager>
  ) {
    const manager = this.getManager(tx);
    const course = await manager.findOne(Course, { where: { id } });
    return course ? manager.save(Object.assign(course, data)) : null;
  }

  public async DeleteRecordById(id: number, tx?: ITransaction<EntityManager>) {
    const manager = this.getManager(tx);
    const course = await manager.findOne(Course, { where: { id } });
    if (course) await manager.delete(Course, id);
    return course;
  }

  public async GetRecordsList(filterOptions: FilterQueryOptions<Course>) {
    const { search, filters, sortBy, order, page, limit } = filterOptions;

    const queryBuilder = this._repo.createQueryBuilder('course');

    if (search) {
      queryBuilder.andWhere('course.name ILIKE :search', { search: `%${search}%` });
    }

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof Course];
        if (value !== undefined) {
          queryBuilder.andWhere(`course.${key} = :${key}`, { [key]: value });
        }
      });
    }

    if (sortBy && order) {
      queryBuilder.orderBy(`course.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');
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
