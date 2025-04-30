import { HttpStatus } from '@nestjs/common';

import { RESPONSE_DTO_EXAMPLE } from '../example';
import { API_STATUS_MESSAGES } from '@application/api/documentation/consts/api-status-messages.constants';

export const GET_COURSES_LIST = {
  method: 'GetCoursesList',
  summary: 'Get a list of courses',
  description: `
          Retrieves a paginated list of course records based on optional filters, sorting, and pagination parameters.
          Supports searching by name, filtering by tags, sorting, and ordering.
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
                path: '/api/courses',
                method: 'GET',
                params: {},
                query: {
                  search: 'Web Design', 
                  tags: 'IWD,web',
                  sortBy: 'name', 
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
      description: 'Successfully retrieved the list of courses'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid query parameters'
    }
  }
};