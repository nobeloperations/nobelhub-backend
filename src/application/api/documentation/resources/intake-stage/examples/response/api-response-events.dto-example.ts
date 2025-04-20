import { HttpStatus } from '@nestjs/common';

import { ApiResponseDto, ResponseIntakeEventDto } from '@application/api/dtos';

import { RESPONSE_DTO_EXAMPLE } from '../../../intake-event/examples';
import { API_STATUS_MESSAGES } from '@application/api/documentation/consts/api-status-messages.constants';

export const API_RESPONSE_EVENTS_DTO_EXAMPLE: ApiResponseDto<ResponseIntakeEventDto[]> = {
  success: true,
  meta: {
    statusCode: HttpStatus.OK,
    statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
    timestamp: new Date().toISOString(),
    request: {
      path: '/api/resource',
      method: 'POST',
      params: {},
      query: {}
    }
  },
  data: [RESPONSE_DTO_EXAMPLE]
};
