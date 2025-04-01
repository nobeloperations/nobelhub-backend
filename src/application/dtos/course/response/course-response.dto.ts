// import { CourseTagResponseDto } from './course-tag-response.dto';
import { Expose } from 'class-transformer';
export class CourseResponseDto {

  @Expose()
  code: string;
  
  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  teachableId: string;

  @Expose()
  resourceUrl: string;

  @Expose()
  tags:[];
}