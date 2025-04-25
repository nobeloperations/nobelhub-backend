import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { Contact } from '@domain/entities/contact.entity';

export class CreateContactDto {
  @ApiProperty({
    description: 'First name of the contact',
    example: 'John',
    required: true
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name cannot be longer than 50 characters' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the contact',
    example: 'Doe',
    required: true
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name cannot be longer than 50 characters' })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'john.doe@example.com',
    required: true
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890',
    required: true
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
  @MaxLength(20, { message: 'Phone number cannot be longer than 20 characters' })
  phone: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Example Corp',
    required: true
  })
  @IsNotEmpty({ message: 'Company name is required' })
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(100, { message: 'Company name cannot be longer than 100 characters' })
  company: string;

  @ApiProperty({
    description: 'Position in the company',
    example: 'Developer',
    required: true
  })
  @IsNotEmpty({ message: 'Position is required' })
  @IsString({ message: 'Position must be a string' })
  @MaxLength(100, { message: 'Position cannot be longer than 100 characters' })
  position: string;

  public static toEntity(dto: CreateContactDto): Contact {
    return plainToClass(Contact, instanceToPlain(dto));
  }
} 