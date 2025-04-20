import { Controller, Param, Body, Get, Post, Delete, Query } from '@nestjs/common';

import { CreateIntakeDto, FilterIntakeDto } from '@application/api/dtos';
import {
  ResourceDocumentation,
  INTAKE_OPERATIONS_DOCS,
  INTAKE_RESOURCE_NAME
} from '@application/api/documentation';
import { CreateIntakeUseCase } from '@application/use-cases/intake/create-intake.use-case';
import { GetIntakesListUseCase } from '@application/use-cases/intake/get-intakes-list.use-case';
import { GetTargetIntakeUseCase } from '@application/use-cases/intake/get-target-intake.use-case';
import { DeleteIntakeUseCase } from '@application/use-cases/intake/delete-intake.use-case';
import { GetIntakeStagesUseCase } from '@application/use-cases/intake/get-intake-stages.use-case';

@Controller(INTAKE_RESOURCE_NAME)
@ResourceDocumentation(INTAKE_OPERATIONS_DOCS)
export class IntakeController {
  constructor(
    private readonly _createIntakeUseCase: CreateIntakeUseCase,
    private readonly _deleteIntakeUseCase: DeleteIntakeUseCase,
    private readonly _getIntakesListUseCase: GetIntakesListUseCase,
    private readonly _getTargetIntakeUseCase: GetTargetIntakeUseCase,
    private readonly _getIntakeStagesUseCase: GetIntakeStagesUseCase
  ) {}

  @Post()
  async CreateIntake(@Body() requestedIntakeData: CreateIntakeDto) {
    const intakeData = CreateIntakeDto.toEntity(requestedIntakeData);
    return await this._createIntakeUseCase.Execute(intakeData);
  }

  @Get()
  async GetIntakesList(@Query() query: FilterIntakeDto) {
    const filterOptions = query.toFilterOptions();
    return await this._getIntakesListUseCase.Execute(filterOptions);
  }

  @Get(':id')
  async GetIntakeById(@Param('id') id: number) {
    return this._getTargetIntakeUseCase.Execute(id);
  }

  @Delete(':id')
  async DeleteIntakeById(@Param('id') id: number) {
    return this._deleteIntakeUseCase.Execute(id);
  }

  @Get(':id/stages')
  async GetStages(@Param('id') id: number) {
    return this._getIntakeStagesUseCase.Execute(id);
  }
}
