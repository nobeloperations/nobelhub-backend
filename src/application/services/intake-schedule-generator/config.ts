import { IntakeEventName } from '@domain/entities/intake-event.entity';
import { IntakeStageName } from '@domain/entities/intake-stage.entity';

interface IntakeEventPlanningData {
  name: IntakeEventName;
  utcStartHours: number;
  eventDurationInHourse: number;
  dayOffsetFromInternshipStart: number;
}

type IntakeSchedule = Record<IntakeStageName, IntakeEventPlanningData[]>;

export const WEEKDAY_INTAKE_SCHEDULE_CONFIG: IntakeSchedule = {
  [IntakeStageName.INTERNSHIP_INITIATION]: [
    {
      name: IntakeEventName.MAIN_EDUQUEST_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 0
    },
    {
      name: IntakeEventName.BACKUP_EDUQUEST_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 1
    },
    {
      name: IntakeEventName.OPPORTUNITY_EDUQUEST_SESSION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 2
    }
  ],
  [IntakeStageName.INTORO_COURSES]: [
    {
      name: IntakeEventName.INTRO_COURSE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 7
    },
    {
      name: IntakeEventName.INTRO_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 8
    },
    {
      name: IntakeEventName.INTRO_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 9
    },
    {
      name: IntakeEventName.INTRO_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 11
    }
  ],
  [IntakeStageName.LEADERSHIP_FOUNDATIONS]: [
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 14
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 15
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 16
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 18
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_BIT]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_BIT_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 28
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 29
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 30
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 32
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_PAP]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 35
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 36
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 37
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 39
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_IWD]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 42
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 43
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 44
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 51
    }
  ],
  [IntakeStageName.INTERNSHIP_ONBOARDING]: [
    {
      name: IntakeEventName.EDUQUEST_TRAINING,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 46
    },
    {
      name: IntakeEventName.EDUQUEST_MAIN_EVENT_FACILITATION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 49
    },
    {
      name: IntakeEventName.EDUQUEST_BACKUP_EVENT_FACILITATION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 50
    }
  ],
  [IntakeStageName.ADVANCED_LEADERSHIP]: [
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 56
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 57
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 58
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 60
    }
  ],
  [IntakeStageName.GUIDANCE]: [
    {
      name: IntakeEventName.INTAKE_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 4
    },
    {
      name: IntakeEventName.MENTOR_MEET_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 7
    },
    {
      name: IntakeEventName.FACILITAION_TRAINING,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 21
    },
    {
      name: IntakeEventName.INTAKE_BOUNDING_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 22
    },
    {
      name: IntakeEventName.CAPSTONE_PROJECT_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 23
    },
    {
      name: IntakeEventName.CAPSTONE_PROJECT_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 23
    },
    {
      name: IntakeEventName.JOIN_TEAM_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 25
    },
    {
      name: IntakeEventName.MENTOR_MEET_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 53
    }
  ],
  [IntakeStageName.CAPSTONE_PROJECT]: [
    {
      name: IntakeEventName.CAPSTONE_PROJECT_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 25
    },
    {
      name: IntakeEventName.CAPSTONE_PROJECT_EXPO,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 53
    }
  ]
};

export const WEEKEND_INTAKE_SCHEDULE_CONFIG: IntakeSchedule = {
  [IntakeStageName.INTERNSHIP_INITIATION]: [
    {
      name: IntakeEventName.MAIN_EDUQUEST_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 0
    },
    {
      name: IntakeEventName.BACKUP_EDUQUEST_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 1
    },
    {
      name: IntakeEventName.OPPORTUNITY_EDUQUEST_SESSION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 7
    }
  ],
  [IntakeStageName.INTORO_COURSES]: [
    {
      name: IntakeEventName.INTRO_COURSE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 14
    },
    {
      name: IntakeEventName.INTRO_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 15
    },
    {
      name: IntakeEventName.INTRO_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 21
    },
    {
      name: IntakeEventName.INTRO_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 22
    }
  ],
  [IntakeStageName.LEADERSHIP_FOUNDATIONS]: [
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 28
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 29
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 35
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 36
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_BIT]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_BIT_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 49
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 50
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 56
    },
    {
      name: IntakeEventName.LEADERSHIP_COURSE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 57
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_PAP]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 63
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 64
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 70
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_PAP_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 71
    }
  ],
  [IntakeStageName.LEADERSHIP_PRACTICE_IWD]: [
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 77
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 78
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 84
    },
    {
      name: IntakeEventName.LEADERSHIP_PRACTICE_IWD_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 99
    }
  ],
  [IntakeStageName.INTERNSHIP_ONBOARDING]: [
    {
      name: IntakeEventName.EDUQUEST_TRAINING,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 85
    },
    {
      name: IntakeEventName.EDUQUEST_MAIN_EVENT_FACILITATION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 91
    },
    {
      name: IntakeEventName.EDUQUEST_BACKUP_EVENT_FACILITATION,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 92
    }
  ],
  [IntakeStageName.ADVANCED_LEADERSHIP]: [
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 105
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_2,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 106
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_DAY_3,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 112
    },
    {
      name: IntakeEventName.ADVANCED_LEADERSHIP_PRACTICE_EXPO_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 113
    }
  ],
  [IntakeStageName.GUIDANCE]: [
    {
      name: IntakeEventName.INTAKE_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 8
    },
    {
      name: IntakeEventName.MENTOR_MEET_1,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 7
    },
    {
      name: IntakeEventName.FACILITAION_TRAINING,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 42
    },
    {
      name: IntakeEventName.INTAKE_BOUNDING_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 43
    },
    {
      name: IntakeEventName.JOIN_TEAM_EVENT,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 43
    },
    {
      name: IntakeEventName.POST_FUNDAMENTALS_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 99
    }
  ],
  [IntakeStageName.CAPSTONE_PROJECT]: [
    {
      name: IntakeEventName.CAPSTONE_PROJECT_ORIENTATION_DAY,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 43
    },
    {
      name: IntakeEventName.CAPSTONE_PROJECT_EXPO,
      utcStartHours: 14,
      eventDurationInHourse: 2,
      dayOffsetFromInternshipStart: 98
    }
  ]
};
