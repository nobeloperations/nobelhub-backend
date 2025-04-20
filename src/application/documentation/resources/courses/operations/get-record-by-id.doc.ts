import { HttpStatus } from '@nestjs/common';
import { API_RESPONSE_DTO_EXAMPLE } from '../examples/response/api-response.dto-example';

export const GET_COURSE_BY_ID = {
  method: 'GetCourseById',
  summary: 'Get a course by ID',
  description: `
          Retrieves a course record from the system using the provided ID.
          If the course does not exist, an error response is returned.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the course to retrieve',
      schema: { type: 'string' } 
    }
  ],
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      content: {
        'application/json': {
          example: API_RESPONSE_DTO_EXAMPLE
        }
      },
      description: 'Successfully retrieved the course details'
    },
    [HttpStatus.NOT_FOUND]: {
      status: HttpStatus.NOT_FOUND,
      description: 'Course with the given ID was not found'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID format'
    }
  }
};
