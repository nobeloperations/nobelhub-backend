import { HttpStatus } from '@nestjs/common';

import { CreateIntakeDto } from '@application/api/dtos';

import { API_RESPONSE_DTO_EXAMPLE } from '../examples';
import { CREATE_REQUEST_DTO_EXAMPLE } from '../examples';

export const CREATE_RECORD = {
  method: 'CreateIntake',
  summary: 'Create a new intake',
  description: `
        Creates a new intake record in the system.
        The request body must include essential details, such as the start date and program type.
        Additional fields, including the name and application deadline, are generated automatically by the system.
    `,
  requestBody: {
    content: {
      'application/json': {
        type: CreateIntakeDto
      }
    },
    examples: {
      'application/json': CREATE_REQUEST_DTO_EXAMPLE
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
      description: 'Successfully created a new intake and returned its details'
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
