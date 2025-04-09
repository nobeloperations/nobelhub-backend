import { IsEnum, IsOptional, IsString, IsIn, Min, IsInt } from 'class-validator';
<<<<<<< HEAD

=======
import { ApiProperty } from '@nestjs/swagger';
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
import { IntakeProgramType } from '@domain/entities/intake.entity';
import { Type } from 'class-transformer';

export class FilterIntakeDto {
<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Search by intake name',
    required: false,
    type: String,
    example: 'FEB'
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsString()
  search?: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Filter by program type',
    required: false,
    enum: IntakeProgramType,
    example: IntakeProgramType.WEEKDAY
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsEnum(IntakeProgramType)
  programType?: IntakeProgramType;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Sort results by a specific field',
    required: false,
    type: String,
    example: 'name'
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsString()
  sortBy?: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Order of sorting (asc or desc)',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc'
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    type: Number,
    minimum: 1,
    example: 1
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'Number of records per page',
    required: false,
    type: Number,
    minimum: 1,
    example: 10
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}
