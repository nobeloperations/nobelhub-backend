import { Exclude, Expose } from 'class-transformer';

import { IntakeProgramType } from '@domain/entities/intake.entity';

@Exclude()
export class ResponseIntakeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  applicationDeadline: Date;

  @Expose()
  programType: IntakeProgramType;
}
