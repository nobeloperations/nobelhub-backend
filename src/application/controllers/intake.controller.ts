import { Controller, Param, Body, Get, Post, Put, Delete, Query } from '@nestjs/common';

import { Intake } from '@domain/entities/intake.entity';
import { IntakeUseCases } from '@domain/use-cases/intake.use-cases';
import { FilterQueryOptions } from '@domain/abstractions/database-service/query-options/filter.query-options';

import { CreateIntakeDto, UpdateIntakeDto, FilterIntakeDto } from '@application/dtos';
import { ApiTags } from '@nestjs/swagger';
import { ResourceDocumentation } from '@application/documentation/decorators/resource-documentation.decorator';
import { INTAKES_CONTROLLER_DOCUMENTATION } from '@application/documentation/resources/intake';

@ApiTags('Intakes')
@ResourceDocumentation(INTAKES_CONTROLLER_DOCUMENTATION)
@Controller('intakes')
export class IntakeController {
  constructor(private readonly _intakeUseCases: IntakeUseCases) {}

  @Post()
  async CreateIntake(@Body() requestedIntakeData: CreateIntakeDto) {
    const intakeData = CreateIntakeDto.toEntity(requestedIntakeData);
    return await this._intakeUseCases.CreateIntake(intakeData);
  }

  @Get()
  async GetIntakesList(@Query() query: FilterIntakeDto) {
    const filterOptions: FilterQueryOptions<Intake> = {
      search: query.search,
      filters: {
        programType: query.programType
      },
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy:
        query.sortBy && ((query.sortBy in {}) as unknown as Intake)
          ? (query.sortBy as keyof Intake)
          : 'id',
      order: query.order ?? 'asc'
    };

    return await this._intakeUseCases.GetIntakesList(filterOptions);
  }

  @Get(':id')
  async GetIntakeById(@Param('id') id: number) {
    return await this._intakeUseCases.GetIntakeById(id);
  }

  @Put(':id')
  async UpdateIntake(@Param('id') id: number, @Body() requestedIntakeData: UpdateIntakeDto) {
    const intakeData = UpdateIntakeDto.toEntity(requestedIntakeData);
    return await this._intakeUseCases.UpdateIntakeById(id, intakeData);
  }

  @Delete(':id')
  async DeleteIntake(@Param('id') id: number) {
    return await this._intakeUseCases.DeleteIntakeById(id);
  }
}
