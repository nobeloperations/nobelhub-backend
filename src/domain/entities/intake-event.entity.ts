import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { IntakeStage } from './intake-stage.entity';
import { OnlineEvent } from './online-event.entity';

export enum IntakeEventName {
  MAIN_EDUQUEST_EVENT = 'Main EduQuest Event',
  BACKUP_EDUQUEST_EVENT = 'Backup EduQuest Event',
  OPPORTUNITY_EDUQUEST_SESSION = 'Opportunity EduQuest Session',

  INTAKE_ORIENTATION_DAY = 'Orientation Day',

  INTRO_COURSE_DAY_1 = 'Intro Course Day 1',
  INTRO_COURSE_DAY_2 = 'Intro Course Day 2',
  INTRO_COURSE_DAY_3 = 'Intro Course Day 3',
  INTRO_COURSE_EXPO_DAY = 'Intro Course Expo Day',

  LEADERSHIP_COURSE_DAY_1 = 'Leadership Course Day 1',
  LEADERSHIP_COURSE_DAY_2 = 'Leadership Course Day 2',
  LEADERSHIP_COURSE_DAY_3 = 'Leadership Course Day 3',
  LEADERSHIP_COURSE_EXPO_DAY = 'Leadership Course Expo Day',

  JOIN_TEAM_EVENT = 'Join Team Event',
  INTAKE_BOUNDING_EVENT = 'Intake Bonding Event',
  FACILITAION_TRAINING = 'Facilitation Training',

  MENTOR_MEET_1 = 'Mentor Meet 1',
  MENTOR_MEET_2 = 'Mentor Meet 2',
  MENTOR_MEET_EXPO = 'Mentor Meet Expo',

  CAPSTONE_PROJECT_ORIENTATION_DAY = 'Capstone Project Orientation Day',
  CAPSTONE_PROJECT_EXPO = 'Capstone Project Expo',

  LEADERSHIP_PRACTICE_BIT_DAY_1 = 'Leadership Practice BIT Day 1',
  LEADERSHIP_PRACTICE_BIT_DAY_2 = 'Leadership Practice BIT Day 2',
  LEADERSHIP_PRACTICE_BIT_DAY_3 = 'Leadership Practice BIT Day 3',
  LEADERSHIP_PRACTICE_BIT_EXPO_DAY = 'Leadership Practice BIT Expo Day',

  LEADERSHIP_PRACTICE_PAP_DAY_1 = 'Leadership Practice PAP Day 1',
  LEADERSHIP_PRACTICE_PAP_DAY_2 = 'Leadership Practice PAP Day 2',
  LEADERSHIP_PRACTICE_PAP_DAY_3 = 'Leadership Practice PAP Day 3',
  LEADERSHIP_PRACTICE_PAP_EXPO_DAY = 'Leadership Practice PAP Expo Day',

  LEADERSHIP_PRACTICE_IWD_DAY_1 = 'Leadership Practice IWD Day 1',
  LEADERSHIP_PRACTICE_IWD_DAY_2 = 'Leadership Practice IWD Day 2',
  LEADERSHIP_PRACTICE_IWD_DAY_3 = 'Leadership Practice IWD Day 3',
  LEADERSHIP_PRACTICE_IWD_EXPO_DAY = 'Leadership Practice IWD Expo Day',

  EDUQUEST_TRAINING = 'EduQuest Training',
  EDUQUEST_MAIN_EVENT_FACILITATION = 'EduQuest Main Event Facilitation',
  EDUQUEST_BACKUP_EVENT_FACILITATION = 'EduQuest Backup Event Facilitation',

  POST_FUNDAMENTALS_ORIENTATION_DAY = 'Post-Fundamentals Orientation Day',

  ADVANCED_LEADERSHIP_PRACTICE_DAY_1 = 'Advanced Leadership Practice Day 1',
  ADVANCED_LEADERSHIP_PRACTICE_DAY_2 = 'Advanced Leadership Practice Day 2',
  ADVANCED_LEADERSHIP_PRACTICE_DAY_3 = 'Advanced Leadership Practice Day 3',
  ADVANCED_LEADERSHIP_PRACTICE_EXPO_DAY = 'Advanced Leadership Practice Expo Day'
}

@Entity('intake_events')
export class IntakeEvent extends BaseEntity {
  @Column({ type: 'text', enum: IntakeEventName })
  name: IntakeEventName;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @ManyToOne(() => IntakeStage, stage => stage.events)
  @JoinColumn({ name: 'stage_id' })
  stage: IntakeStage;

  @OneToOne(() => OnlineEvent, { nullable: true })
  @JoinColumn({ name: 'online_event_id' })
  onlineEvent?: OnlineEvent;
}
