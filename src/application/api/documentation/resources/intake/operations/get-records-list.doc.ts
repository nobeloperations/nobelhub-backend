import { HttpStatus } from '@nestjs/common';

import { RESPONSE_DTO_EXAMPLE } from '../examples';
import { API_STATUS_MESSAGES } from '@application/documentation/consts/api-status-messages.constants';

export const GET_RECORDS_LIST = {
  method: 'GetIntakesList',
  summary: 'Get a list of intakes',
  description: `
          Retrieves a paginated list of intake records based on optional filters, sorting, and pagination parameters.
          Supports searching by name, filtering by program type, sorting, and ordering.
      `,
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      content: {
        'application/json': {
          example: {
            success: true,
            meta: {
              statusCode: HttpStatus.OK,
              statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
              timestamp: new Date().toISOString(),
              request: {
                path: '/api/intakes',
                method: 'GET',
                params: {},
                query: {
                  search: 'FEB 16',
                  programType: 'Weekday',
                  sortBy: 'applicationDeadline',
                  order: 'asc',
                  page: 1,
                  limit: 10
                }
              }
            },
            data: [RESPONSE_DTO_EXAMPLE]
          }
        }
      },
      description: 'Successfully retrieved the list of intakes'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid query parameters'
    }
  }
};
