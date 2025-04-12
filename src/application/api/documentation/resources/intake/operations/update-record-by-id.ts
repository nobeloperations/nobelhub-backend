import { HttpStatus } from '@nestjs/common';

import { UpdateIntakeDto } from '@application/api/dtos';

import { UPDATE_REQUEST_DTO_EXAMPLE, API_RESPONSE_DTO_EXAMPLE } from '../examples';

export const UPDATE_RECORD_BY_ID = {
  method: 'UpdateIntakeById',
  summary: 'Update an intake by ID',
  description: `
          Updates an existing intake record in the system using the provided ID.
          The request body must include updated details such as the start date and program type.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the intake to update',
      schema: { type: 'integer' }
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        type: UpdateIntakeDto
      }
    },
    examples: {
      'application/json': UPDATE_REQUEST_DTO_EXAMPLE
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
    [HttpStatus.NOT_FOUND]: {
      status: HttpStatus.NOT_FOUND,
      description: 'Intake with the given ID was not found'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID format or malformed request body'
    },
    [HttpStatus.CONFLICT]: {
      status: HttpStatus.CONFLICT,
      description: 'An intake with the same launch date already exists'
    }
  }
};
