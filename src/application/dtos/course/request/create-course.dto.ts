import { IsNotEmpty, IsString, IsUrl, IsArray } from 'class-validator';
import { Course } from '@domain/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToClass } from 'class-transformer';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to python'
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Course description',
    example: 'Learn the basics of programming with Python.'
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Unique identifier for the course LMS',
    example: '12345'
  })
  teachableId: string;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'URL to the course resource',
    example: 'https://example.com/course-resource'
  })
  resourceUrl: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({      
    description: 'List of tags associated with the course',
    example: ['python', 'programming', 'beginner']
  })
  @IsString({ each: true })
  tags: string[];

  public static toEntity(dto: CreateCourseDto): Course {
    const courseData = instanceToPlain(dto);

    return plainToClass(Course, courseData);
  }
}
