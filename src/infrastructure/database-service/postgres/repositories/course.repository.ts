import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Course } from '@domain/entities/course.entity';
import { ITransaction } from '@domain/abstractions/transaction-service';
import { ICourseRepository } from '@domain/abstractions/database-service/repositories/course.abstract-repository';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';



