import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateContactDto {
  @ApiProperty({
    description: 'First name of the contact',
    example: 'John',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name cannot be longer than 50 characters' })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the contact',
    example: 'Doe',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name cannot be longer than 50 characters' })
  lastName?: string;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'john.doe@example.com',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
  @MaxLength(20, { message: 'Phone number cannot be longer than 20 characters' })
  phone?: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Example Corp',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Company name cannot be empty' })
  @IsString({ message: 'Company name must be a string' })
  @MaxLength(100, { message: 'Company name cannot be longer than 100 characters' })
  company?: string;

  @ApiProperty({
    description: 'Position in the company',
    example: 'Developer',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Position cannot be empty' })
  @IsString({ message: 'Position must be a string' })
  @MaxLength(100, { message: 'Position cannot be longer than 100 characters' })
  position?: string;
} 