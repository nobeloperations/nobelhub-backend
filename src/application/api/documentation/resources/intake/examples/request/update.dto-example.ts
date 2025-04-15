import { IntakeProgramType } from '@domain/entities/intake.entity';

import { UpdateIntakeDto } from '@application/api/dtos';

export const UPDATE_REQUEST_DTO_EXAMPLE: UpdateIntakeDto = {
  startDate: new Date(),
  programType: IntakeProgramType.WEEKDAY
};
