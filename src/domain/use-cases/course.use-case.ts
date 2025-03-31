import { Injectable } from '@nestjs/common';

import { Course } from '@domain/entities/course.entity';
import { DatabaseService } from '@domain/abstractions/database-service';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';
import { ITransaction, TransactionManagerService } from '@domain/abstractions/transaction-service';
import { CourseTag } from '@domain/entities/course-tag.entity';


@Injectable()
export class CourseUseCases {
  constructor(
    private readonly _databaseService: DatabaseService,
    private readonly _transactionManagerService: TransactionManagerService
    
  ) {}


    public async CreateCourse(courseData: Course) {
            const createdCourse = await this._transactionManagerService.startTransaction(async (tx: ITransaction) => {

      
             return this._databaseService.course.createRecord({
                 ...courseData,
                    
             });

            });
            return createdCourse;
       
    }
 

    public async GetCourseById(id: number) {    
      const targetCourse = await this._databaseService.course.getRecordById(id);
      return targetCourse;
    }
    

    public async GetCoursesList(filterOptions: FilterQueryOptions<Course>) {
      const coursesList = await this._databaseService.course.getRecordsList(filterOptions);
      return coursesList;
    } 
  
    public async UpdateCourseById(id: number, courseData: Course ) {
      const updatedCourse = await this._databaseService.course.updateRecordById(id, courseData);
      return updatedCourse;
    }
    
  }