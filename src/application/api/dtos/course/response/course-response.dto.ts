import { Exclude, Expose } from 'class-transformer';

import { Course } from '@domain/entities/course.entity';

@Exclude()
export class ResponseCourseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  teachableId: string;

  @Expose()
  resourceUrl: string;

  @Expose()
  schdeuledCourses: [];

  @Expose()
  tags: [];
}