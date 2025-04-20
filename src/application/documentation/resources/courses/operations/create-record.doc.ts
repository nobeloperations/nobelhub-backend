import { HttpStatus } from '@nestjs/common';

import { CreateCourseDto } from '@application/dtos';

import { CREATE_COURSE_DTO_EXAMPLE } from '../examples/request/create-course.dto-example';
import { API_RESPONSE_DTO_EXAMPLE } from '../examples/response/api-response.dto-example';
export const CREATE_RECORD = {
  method: 'CreateCourse',
  summary: 'Create a new Course',
  description: `
        Create a new course in the system.
        The request body must include course name, description, teachableId, resourceurl, course tags,
        course schedule and courses ids.
    `,
  requestBody: {
    content: {
      'application/json': {
        type: CreateCourseDto
      }
    },
    examples: {
      'application/json': CREATE_COURSE_DTO_EXAMPLE
    }
  },
  responses: {
    [HttpStatus.CREATED]: {
      status: HttpStatus.CREATED,
      content: {
        'application/json': {
          example: API_RESPONSE_DTO_EXAMPLE
        }
      },
      description: 'Successfully created a new course and returned its details'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Malformed request body or missing required fields'
    },
    [HttpStatus.CONFLICT]: {
      status: HttpStatus.CONFLICT,
      description: 'An intake with the same launch date already exists'
    }
  }
};
