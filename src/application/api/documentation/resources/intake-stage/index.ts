import { GET_INTAKE_STAGE_EVENTS } from './operations/get-intake-stage-events.doc';

export const INTAKE_STAGE_RESOURCE_NAME = 'intake-stages';

export const INTAKE_STAGE_OPERATIONS_DOCS = {
  tag: 'Intake Stages',
  description: 'Handles intake-stages-related actions',
  operations: [GET_INTAKE_STAGE_EVENTS]
};
