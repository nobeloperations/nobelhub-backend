import { IntakeProgramType } from '@domain/entities/intake.entity';
import { ResponseIntakeDto } from '@application/api/dtos';

export const RESPONSE_DTO_EXAMPLE: ResponseIntakeDto = {
  id: 1,
  name: 'JAN 21 WD 25',
  startDate: new Date(),
  applicationDeadline: new Date(),
  programType: IntakeProgramType.WEEKDAY
};
