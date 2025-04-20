import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { instanceToPlain, plainToClass, Type } from 'class-transformer';


import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

export class CreateIntakeDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)

  @ApiProperty({
    description: 'The launch date of the intake',
    example: '2024-03-09T14:00:00Z'
  })

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

  public static toEntity(dto: CreateIntakeDto): Intake {
    const intakeData = instanceToPlain(dto);

    return plainToClass(Intake, intakeData);
  }
}
