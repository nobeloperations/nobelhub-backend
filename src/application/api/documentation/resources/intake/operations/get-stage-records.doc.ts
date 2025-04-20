import { HttpStatus } from '@nestjs/common';

import { API_RESPONSE_STAGES_DTO_EXAMPLE } from '../examples/response/api-response-stages.dto-example';

export const GET_STAGE_RECORDS = {
  method: 'GetStages',
  summary: 'Retrieve a list of stages associated with a specific intake',
  description: `
          Retrieves a list of intake stages associated with a specific intake.
          Provides detailed information about each stage.
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
          example: API_RESPONSE_STAGES_DTO_EXAMPLE
        }
      },
      description: 'Successfully retrieved the intake stages data'
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
