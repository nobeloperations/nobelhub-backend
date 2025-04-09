import { Controller, Param, Body, Get, Post, Put, Delete, Query } from '@nestjs/common';
import { Course } from '@domain/entities/course.entity';
import { CourseUseCases } from '@domain/use-cases/course.use-case';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';
import { CreateCourseDto, UpdateCourseDto, FilterCoursesDto } from '@application/dtos';

@Controller('courses')
export class CourseController {
  constructor(private readonly _courseUseCases: CourseUseCases) { }

  @Post()
  async CreateCourse(@Body() requestedCourseData: CreateCourseDto) {
    const courseData = CreateCourseDto.toEntity(requestedCourseData);
    return await this._courseUseCases.CreateCourse(courseData);
  }

  @Get()
  async GetCoursesList(@Query() query: FilterCoursesDto) {
    const filterOptions: FilterQueryOptions<Course> = {
      search: query.search,
      filters: {
        tags: query.tags
      },
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy as keyof Course,
      order: query.order ?? 'asc'
    };

    return await this._courseUseCases.GetCoursesList(filterOptions);
  }

  @Get(':id')
  async GetCourseById(@Param('id') id: number) {
    return await this._courseUseCases.GetCourseById(id);
  }

  @Put(':id')
  async UpdateCourse(@Param('id') id: number, @Body() requestedCourseData: UpdateCourseDto) {
    const courseData = UpdateCourseDto.toEntity(requestedCourseData);
    return await this._courseUseCases.UpdateCourseById(id, courseData);
  }

  @Delete(':id')
  async DeleteCourse(@Param('id') id: number) {
    return await this._courseUseCases.deleteRecordById(id);
  }
}