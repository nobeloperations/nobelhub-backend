export const API_STATUS_MESSAGES = {
  200: 'Request completed successfully',
  201: 'Resource created successfully',
  204: 'Request processed successfully, no content to return',
  400: 'The request was invalid. Please check the input data',
  401: 'Invalid authentication token',
  403: 'You do not have permission to access this resource',
  404: 'The requested resource could not be found',
  409: 'Conflict: The request could not be completed due to a conflict with the current state of the target resource',
  422: 'The request was well-formed but could not be processed',
  500: 'An unexpected error occurred on the server',
  502: 'The server received an invalid response from the upstream server',
  503: 'The service is currently unavailable. Please try again later',
  504: 'The server took too long to respond. Please try again later'
};
