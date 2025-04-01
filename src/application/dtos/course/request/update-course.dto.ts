import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, IsOptional } from 'class-validator';
import { Course } from '@domain/entities/course.entity';

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

     

    @IsNotEmpty()
    teachableId?: string;

    
    @IsUrl()
    resourceUrl?: string;

    public static toEntity(dto: UpdateCourseDto): Course {
        const courseData = instanceToPlain(dto);
        return plainToClass(Course, courseData);
    }
}