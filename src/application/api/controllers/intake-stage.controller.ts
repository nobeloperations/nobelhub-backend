import { Param, Get, Controller } from '@nestjs/common';

import { GetIntakeStageEvents } from '@application/use-cases/intake-stage/get-stage-events.use-case';
import {
  ResourceDocumentation,
  INTAKE_STAGE_OPERATIONS_DOCS,
  INTAKE_STAGE_RESOURCE_NAME
} from '@application/api/documentation';

@Controller(INTAKE_STAGE_RESOURCE_NAME)
@ResourceDocumentation(INTAKE_STAGE_OPERATIONS_DOCS)
export class IntakeStageController {
  constructor(private readonly _getIntakeStageEvents: GetIntakeStageEvents) {}

  @Get(':id/events')
  async GetEvents(@Param('id') id: number) {
    return this._getIntakeStageEvents.Execute(id);
  }
}
