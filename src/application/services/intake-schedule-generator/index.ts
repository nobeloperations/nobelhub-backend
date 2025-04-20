import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';

import { IntakeEvent } from '@domain/entities/intake-event.entity';
import { Intake, IntakeProgramType } from '@domain/entities/intake.entity';
import { IntakeStage, IntakeStageName } from '@domain/entities/intake-stage.entity';

import { IIntakeScheduleGenerator } from '@domain/abstractions/application-services';

import { WEEKDAY_INTAKE_SCHEDULE_CONFIG, WEEKEND_INTAKE_SCHEDULE_CONFIG } from './config';

const IntakeStageNameDescription: Record<IntakeStageName, string> = {
  [IntakeStageName.INTERNSHIP_INITIATION]: 'The initial stage of the internship program',
  [IntakeStageName.INTORO_COURSES]: 'Introductory courses for new participants',
  [IntakeStageName.LEADERSHIP_FOUNDATIONS]: 'Foundational leadership training',
  [IntakeStageName.LEADERSHIP_PRACTICE_BIT]: 'Leadership practice focused on BIT',
  [IntakeStageName.LEADERSHIP_PRACTICE_PAP]: 'Leadership practice focused on PAP',
  [IntakeStageName.LEADERSHIP_PRACTICE_IWD]: 'Leadership practice focused on IWD',
  [IntakeStageName.INTERNSHIP_ONBOARDING]: 'Onboarding process for interns',
  [IntakeStageName.ADVANCED_LEADERSHIP]:
    'Advanced leadership training for experienced participants',
  [IntakeStageName.CAPSTONE_PROJECT]:
    'Stage dedicated to the planning and execution of a capstone project showcasing acquired skills',
  [IntakeStageName.GUIDANCE]:
    'Stage focused on engaging and supporting participants through mentorship and assistance'
};

@Injectable()
export class IntakeScheduleGenerator implements IIntakeScheduleGenerator {
  GetIntakeSchedule(intake: Intake): IntakeStage[] {
    const stages: IntakeStage[] = [];
    const internshipStartDate = dayjs(intake.startDate);
    const scheduleConfig =
      intake.programType === IntakeProgramType.WEEKDAY
        ? WEEKDAY_INTAKE_SCHEDULE_CONFIG
        : WEEKEND_INTAKE_SCHEDULE_CONFIG;

    for (const stageKey in scheduleConfig) {
      const stageName = stageKey as IntakeStageName;
      const eventsPlanningData = scheduleConfig[stageName];

      const eventDates = eventsPlanningData
        .map(eventPlanningData =>
          internshipStartDate.add(eventPlanningData.dayOffsetFromInternshipStart, 'day')
        )
        .sort((a, b) => a.valueOf() - b.valueOf());

      const stage = new IntakeStage();

      stage.intake = intake;
      stage.name = stageName;
      stage.startDate = eventDates[0].toDate();
      stage.description = IntakeStageNameDescription[stageName];
      stage.endDate = eventDates[eventDates.length - 1].toDate();

      stage.events = eventsPlanningData.map(eventPlanningData => {
        const event = new IntakeEvent();
        const startDate = internshipStartDate
          .clone()
          .add(eventPlanningData.dayOffsetFromInternshipStart, 'days')
          .add(eventPlanningData.utcStartHours, 'hours');

        const endDate = startDate.clone().add(eventPlanningData.eventDurationInHourse, 'hours');

        event.stage = stage;
        event.endDate = endDate.toDate();
        event.name = eventPlanningData.name;
        event.startDate = startDate.toDate();

        return event;
      });

      stages.push(stage);
    }

    return stages;
  }
}
