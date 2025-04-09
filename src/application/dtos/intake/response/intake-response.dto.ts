import { Exclude, Expose } from 'class-transformer';

import { IntakeProgramType } from '@domain/entities/intake.entity';

@Exclude()
export class ResponseIntakeDto {
  @Expose()
<<<<<<< HEAD
=======
  id: number;

  @Expose()
>>>>>>> 097fb539d48b7b31b61ee063462b82b8ce391717
  name: string;

  @Expose()
  startDate: Date;

  @Expose()
  applicationDeadline: Date;

  @Expose()
  programType: IntakeProgramType;
}
