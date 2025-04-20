import { HttpStatus } from '@nestjs/common';

import { ApiResponseDto, CourseResponseDto } from '@application/dtos';

import { RESPONSE_DTO_EXAMPLE } from './response.dto-example';
import { API_STATUS_MESSAGES } from '@application/documentation/consts/api-status-messages.constants';

export const API_RESPONSE_DTO_EXAMPLE: ApiResponseDto<CourseResponseDto> = {
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
    },
    pagination: {
      total: 100,
      page: 1,
      limit: 10,
      totalPages: 10
    }
  },
  data: [RESPONSE_DTO_EXAMPLE]
};
