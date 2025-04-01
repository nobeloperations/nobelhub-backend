import { Exclude, Expose } from 'class-transformer';

import { IntakeProgramType } from '@domain/entities/intake.entity';

@Exclude()
export class ResponseIntakeDto {
  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  applicationDeadline: Date;

  @Expose()
  programType: IntakeProgramType;
}
