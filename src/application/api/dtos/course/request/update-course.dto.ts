import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { Course } from '@domain/entities/course.entity';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to python'
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Course description',
    example: 'Learn the basics of programming with Python.'
  })
  description?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the course LMS',
    example: '12345'
  })
  teachableId?: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'URL to the course resource',
    example: 'https://example.com/course-resource'
  })
  resourceUrl?: string;

  public static toEntity(dto: UpdateCourseDto): Course {
    const courseData = instanceToPlain(dto);
    return plainToClass(Course, courseData);
  }
}
