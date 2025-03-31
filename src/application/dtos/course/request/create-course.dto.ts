import { IsNotEmpty, IsString, IsUrl, IsArray } from "class-validator";
import { Course } from "@domain/entities/course.entity";
import { instanceToPlain, plainToClass } from "class-transformer";

export class CreateCourseDto { 
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsNotEmpty()
    @IsString()
    teachableId: string;
    
    @IsNotEmpty()
    @IsUrl()
    @IsString()
    resourceUrl: string;

    @IsNotEmpty()   
    @IsArray()
    tags: string[];


    
    public static toEntity(dto: CreateCourseDto): Course {
        const courseData = instanceToPlain(dto);
    
        return plainToClass(Course, courseData);
    }
    }
