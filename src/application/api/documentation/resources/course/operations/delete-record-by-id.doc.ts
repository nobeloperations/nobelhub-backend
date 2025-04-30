import { HttpStatus } from '@nestjs/common';

import { API_RESPONSE_DTO_EXAMPLE } from '../example';

export const DELETE_COURSES_BY_ID = {
  method: 'DeleteCourse',
  summary: 'Delete a course by ID',
  description: `
          Deletes a course record from the system based on the provided ID.
          If a course does not exist, an error response is returned.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the course to delete',
      schema: { type: 'integer' }
    }
  ],
  responses: {
    [HttpStatus.CREATED]: {
      status: HttpStatus.CREATED,
      content: {
        'application/json': {
          example: API_RESPONSE_DTO_EXAMPLE
        }
      },
      description: 'Successfully created a new course  and returned its details'
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
