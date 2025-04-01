import { HttpStatus } from '@nestjs/common';

export const API_STATUS_MESSAGES: Record<number, string> = {
  [HttpStatus.OK]: 'Request completed successfully',
  [HttpStatus.CREATED]: 'Resource created successfully',
  [HttpStatus.NO_CONTENT]: 'Request processed successfully, no content to return',
  [HttpStatus.BAD_REQUEST]: 'The request was invalid. Please check the input data',
  [HttpStatus.UNAUTHORIZED]: 'Invalid authentication token',
  [HttpStatus.FORBIDDEN]: 'You do not have permission to access this resource',
  [HttpStatus.NOT_FOUND]: 'The requested resource could not be found',
  [HttpStatus.CONFLICT]:
    'Conflict: The request could not be completed due to a conflict with the current state of the target resource',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'The request was well-formed but could not be processed',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred on the server',
  [HttpStatus.BAD_GATEWAY]: 'The server received an invalid response from the upstream server',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'The service is currently unavailable. Please try again later',
  [HttpStatus.GATEWAY_TIMEOUT]: 'The server took too long to respond. Please try again later'
};
