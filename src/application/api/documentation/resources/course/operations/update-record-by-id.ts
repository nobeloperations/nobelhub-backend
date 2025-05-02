import { HttpStatus } from '@nestjs/common';
import { UpdateCourseDto } from '@application/api/dtos';

import { API_RESPONSE_DTO_EXAMPLE } from '../example';
import { UPDATE_COURSE_DTO_EXAMPLE } from '../example';

export const UPDATE_COURSE_BY_ID = {
  method: 'UpdateCourseById',
  summary: 'Update a course by ID',
  description: `
          Updates an existing course record in the system using the provided ID.
          The request body may include updated details such as name, description, or tags.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the course to update',
      schema: { type: 'string' }
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        type: UpdateCourseDto
      }
    },
    examples: {
      'application/json': UPDATE_COURSE_DTO_EXAMPLE
    }
  },
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      content: {
        'application/json': {
          example: API_RESPONSE_DTO_EXAMPLE
        }
      },
      description: 'Successfully updated the course'
    },
    [HttpStatus.NOT_FOUND]: {
      status: HttpStatus.NOT_FOUND,
      description: 'Course with the given ID was not found'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID format or malformed request body'
    },
    [HttpStatus.CONFLICT]: {
      status: HttpStatus.CONFLICT,
      description: 'A course with the code already exists' 
    }
  }
};
