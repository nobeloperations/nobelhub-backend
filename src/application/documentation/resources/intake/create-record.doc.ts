import { HttpStatus } from '@nestjs/common';

import { IntakeProgramType } from '@domain/entities/intake.entity';

import { ApiResponseDto, ResponseIntakeDto, CreateIntakeDto } from '@application/dtos';
import { API_STATUS_MESSAGES } from '@application/documentation/api-status-messages';

const intakeResponseDtoExample: ResponseIntakeDto = {
  id: 1,
  name: 'Sample Intake',
  startDate: new Date(),
  applicationDeadline: new Date(),
  programType: IntakeProgramType.WEEKDAY
};

const intakeCreationApiResponseExample: ApiResponseDto<ResponseIntakeDto> = {
  success: true,
  meta: {
    statusCode: HttpStatus.OK,
    statusMessage: API_STATUS_MESSAGES[HttpStatus.OK],
    timestamp: new Date().toISOString(),
    request: {
      path: '/api/intakes',
      method: 'POST',
      params: {},
      query: {}
    }
  },
  data: intakeResponseDtoExample
};

const createIntakePayloadExample: CreateIntakeDto = {
  startDate: new Date(),
  programType: IntakeProgramType.WEEKDAY
};

export const INTAKE_CREATION_DOC = {
  method: 'CreateIntake',
  summary: 'Create a new intake',
  description: `
        Creates a new intake record in the system.
        The request body must include essential details, such as the start date and type.
        Additional fields, including the name and application deadline, are generated automatically by the system.
    `,
  requestBody: {
    content: {
      'application/json': {
        type: CreateIntakeDto
      }
    },
    examples: {
      'application/json': createIntakePayloadExample
    }
  },
  responses: {
    [HttpStatus.CREATED]: {
      status: HttpStatus.CREATED,
      content: {
        'application/json': {
          example: intakeCreationApiResponseExample
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
