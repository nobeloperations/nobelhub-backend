import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { instanceToPlain, plainToClass } from 'class-transformer';

import { Contact } from '@domain/entities/contact.entity';

export class ContactResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the contact',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'First name of the contact',
    example: 'John'
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the contact',
    example: 'Doe'
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the contact',
    example: 'john.doe@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890'
  })
  phone: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Example Corp'
  })
  company: string;

  @ApiProperty({
    description: 'Position in the company',
    example: 'Developer'
  })
  position: string;

  @ApiProperty({
    description: 'Date when the contact was created',
    example: '2024-03-20T12:00:00.000Z',
    type: Date
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the contact was last updated',
    example: '2024-03-20T12:00:00.000Z',
    type: Date
  })
  @Type(() => Date)
  updatedAt: Date;

  public static fromEntity(entity: Contact): ContactResponseDto {
    return plainToClass(ContactResponseDto, instanceToPlain(entity));
  }
} 