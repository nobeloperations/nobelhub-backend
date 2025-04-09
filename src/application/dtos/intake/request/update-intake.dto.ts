<<<<<<< HEAD
import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { instanceToPlain, plainToClass, Type } from 'class-transformer';
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

export class UpdateIntakeDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'The launch date of the intake',
    example: '2024-03-09T14:00:00Z'
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(IntakeProgramType)
<<<<<<< HEAD
=======
  @ApiProperty({
    description: 'The program type of the intake (Weekday, Weekend)',
    example: 'Weekday',
    enum: IntakeProgramType
  })
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  programType: IntakeProgramType;

  public static toEntity(dto: UpdateIntakeDto): Intake {
    const intakeData = instanceToPlain(dto);

    return plainToClass(Intake, intakeData);
  }
}
