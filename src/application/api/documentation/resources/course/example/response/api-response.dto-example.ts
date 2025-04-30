import { HttpStatus } from '@nestjs/common';

import { ApiResponseDto, ResponseCourseDto } from '@application/api/dtos';

import { RESPONSE_DTO_EXAMPLE } from './response.dto-example';
import { API_STATUS_MESSAGES } from '@application/api/documentation/consts/api-status-messages.constants';

export const API_RESPONSE_DTO_EXAMPLE: ApiResponseDto<ResponseCourseDto> = {
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
  data: RESPONSE_DTO_EXAMPLE
};