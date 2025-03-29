import { instanceToPlain, plainToClass, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';

export class UpdateIntakeDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(IntakeProgramType)
  programType: IntakeProgramType;

  public static toEntity(dto: UpdateIntakeDto): Intake {
    const intakeData = instanceToPlain(dto);

    return plainToClass(Intake, intakeData);
  }
}
