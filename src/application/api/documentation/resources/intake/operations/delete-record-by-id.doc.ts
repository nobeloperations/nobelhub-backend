import { HttpStatus } from '@nestjs/common';

import { API_RESPONSE_DTO_EXAMPLE } from '../examples';

export const DELETE_RECORD_BY_ID = {
  method: 'DeleteIntakeById',
  summary: 'Delete an intake by ID',
  description: `
          Deletes an intake record from the system based on the provided ID.
          If the intake does not exist, an error response is returned.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the intake to delete',
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
      description: 'Successfully created a new intake and returned its details'
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
