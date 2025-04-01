import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

export class CreateIntakeDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(IntakeProgramType)
  programType: IntakeProgramType;

  public static toEntity(dto: CreateIntakeDto): Intake {
    const intakeData = instanceToPlain(dto);

    return plainToClass(Intake, intakeData);
  }
}
