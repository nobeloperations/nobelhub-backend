import { IntakeProgramType } from '@domain/entities/intake.entity';

import { CreateIntakeDto } from '@application/api/dtos';

export const CREATE_REQUEST_DTO_EXAMPLE: CreateIntakeDto = {
  startDate: new Date(),
  programType: IntakeProgramType.WEEKDAY
};
