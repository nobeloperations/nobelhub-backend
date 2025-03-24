import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Intern } from './intern.entity';
import { ScheduledCourse } from './scheduled-course.entity';

enum InterScheduledCourseRole {
  PARTICIPANT = 'participant',
  FACILITATOR = 'facilitator'
}

enum InternScheduledCourseResult {
  MASTERY = 'mastery',
  FAILED = 'failed'
}

@Entity()
export class InternToScheduledCourse {
  @PrimaryGeneratedColumn()
  public internToScheduledCoursetId: number;

  @PrimaryGeneratedColumn()
  @Column()
  public internId: number;

  @Column()
  public scheduledCourseId: number;

  @Column({ enum: InterScheduledCourseRole })
  public role: InterScheduledCourseRole;

  @Column({ enum: InternScheduledCourseResult })
  public result: InternScheduledCourseResult;

  @ManyToOne(() => Intern, intern => intern.internToScheduledCourses)
  public intern: Intern;

  @ManyToOne(() => ScheduledCourse, scheduledCourse => scheduledCourse.internToScheduledCourses)
  public scheduledCourse: ScheduledCourse;
}
