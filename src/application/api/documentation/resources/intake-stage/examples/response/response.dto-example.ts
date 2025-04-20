import { ResponseIntakeStagetDto } from '@application/api/dtos';

export const RESPONSE_DTO_EXAMPLE: ResponseIntakeStagetDto = {
  id: 1,
  name: 'Internship Onboarding',
  description: 'Onboarding process for interns',
  startDate: new Date(),
  endDate: new Date()
};
