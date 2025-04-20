import { HttpStatus } from '@nestjs/common';

import { API_RESPONSE_EVENTS_DTO_EXAMPLE } from '../examples/response/api-response-events.dto-example';

export const GET_INTAKE_STAGE_EVENTS = {
  method: 'GetEvents',
  summary: 'Retrieve a list of events associated with a specific intake stage',
  description: `
          Retrieves a list of intake stage events associated with a specific intake stage.
          Provides detailed information about each event.
      `,
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'The unique identifier of the stage to retrieve',
      schema: { type: 'integer' }
    }
  ],
  responses: {
    [HttpStatus.OK]: {
      status: HttpStatus.OK,
      content: {
        'application/json': {
          example: API_RESPONSE_EVENTS_DTO_EXAMPLE
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
