import { Controller, Param, Body, Get, Post, Put, Delete, Query } from '@nestjs/common';

import { CreateCourseDto, UpdateCourseDto, FilterCoursesDto } from '@application/api/dtos';
import {
  ResourceDocumentation,
  COURSE_OPERATIONS_DOCS,
  COURSE_RESOURCE_NAME
} from '@application/api/documentation';
import { CreateCourseUseCase } from '@application/use-cases/course/create-course.use-case';
import { DeleteCourseUseCase } from '@application/use-cases/course/delete-course.use-case';
import { GetCourseListUseCase } from '@application/use-cases/course/get-courses-list.use-case';
import { GetTargetCourseUseCase } from '@application/use-cases/course/get-target-use-case';
import { UpdateCourseUseCase } from '@application/use-cases/course/update-course.use-case';

@Controller(COURSE_RESOURCE_NAME)
@ResourceDocumentation(COURSE_OPERATIONS_DOCS)
export class CourseController {
constructor(
    private readonly _createCoUseCase: CreateCourseUseCase,
    private readonly _deleteCourseUseCase: DeleteCourseUseCase,
    private readonly _getCoursesListUseCase: GetCourseListUseCase,
    private readonly _getTargetCourseUseCase: GetTargetCourseUseCase,
    private readonly _updateCourseUseCase: UpdateCourseUseCase
) {}

@Post()
async CreateCourse(@Body() requestedCourseData: CreateCourseDto) {
    const courseData = CreateCourseDto.toEntity(requestedCourseData);
    return await this._createCoUseCase.Execute(courseData);
}

@Get()
async GetCoursesList(@Query() query: FilterCoursesDto) {
    const filterOptions = query.toFilterOptions();
    return await this._getCoursesListUseCase.Execute(filterOptions);
}

@Get(':id')
async GetCourseById(@Param('id') id: number) {
    return this._getTargetCourseUseCase.Execute(id);
}

@Put(':id')
async UpdateCourse(@Param('id') id: number, @Body() requestedCourseData: UpdateCourseDto) {
    const courseData = UpdateCourseDto.toEntity(requestedCourseData);
    return this._updateCourseUseCase.Execute(id, courseData);
}

@Delete(':id')
async DeleteCourse(@Param('id') id: number) {
    return this._deleteCourseUseCase.Execute(id);
}
    

  
}
