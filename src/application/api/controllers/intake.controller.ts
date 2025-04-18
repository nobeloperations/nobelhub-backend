import { Controller, Param, Body, Get, Post, Put, Delete, Query } from '@nestjs/common';

import { IntakeUseCases } from '@application/use-cases/intake.use-cases';
import { CreateIntakeDto, UpdateIntakeDto, FilterIntakeDto } from '@application/api/dtos';
import {
  ResourceDocumentation,
  INTAKE_OPERATIONS_DOCS,
  INTAKE_RESOURCE_NAME
} from '@application/api/documentation';

@Controller(INTAKE_RESOURCE_NAME)
@ResourceDocumentation(INTAKE_OPERATIONS_DOCS)
export class IntakeController {
  constructor(private readonly _intakeUseCases: IntakeUseCases) {}

  @Post()
  async CreateIntake(@Body() requestedIntakeData: CreateIntakeDto) {
    const intakeData = CreateIntakeDto.toEntity(requestedIntakeData);
    return await this._intakeUseCases.CreateIntake(intakeData);
  }

  @Get()
  async GetIntakesList(@Query() query: FilterIntakeDto) {
    const filterOptions = query.toFilterOptions();

    return await this._intakeUseCases.GetIntakesList(filterOptions);
  }

  @Get(':id')
  async GetIntakeById(@Param('id') id: number) {
    return await this._intakeUseCases.GetIntakeById(id);
  }

  @Put(':id')
  async UpdateIntakeById(@Param('id') id: number, @Body() requestedIntakeData: UpdateIntakeDto) {
    const intakeData = UpdateIntakeDto.toEntity(requestedIntakeData);
    return await this._intakeUseCases.UpdateIntakeById(id, intakeData);
  }

  @Delete(':id')
  async DeleteIntakeById(@Param('id') id: number) {
    return await this._intakeUseCases.DeleteIntakeById(id);
  }
}
