import { HttpStatus } from '@nestjs/common';

import { API_RESPONSE_DTO_EXAMPLE } from '../examples';

export const GET_RECORD_BY_ID = {
  method: 'GetIntakeById',
  summary: 'Get an intake by ID',
  description: `
          Retrieves an intake record from the system using the provided ID.
          If the intake does not exist, an error response is returned.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the intake to retrieve',
      schema: { type: 'integer' }
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
      description: 'Successfully retrieved the intake details'
    },
    [HttpStatus.NOT_FOUND]: {
      status: HttpStatus.NOT_FOUND,
      description: 'Intake with the given ID was not found'
    },
    [HttpStatus.BAD_REQUEST]: {
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID format'
    }
  }
};
