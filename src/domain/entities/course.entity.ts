import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { CourseTag } from './course-tag.entity';
import { ScheduledCourse } from './scheduled-course.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'code', type: 'text' })
  code: string;

  @Column({ name: 'teachable_id', type: 'text' })
  teachableId: string;

  @Column({ name: 'resources_url', type: 'timestamp', unique: true })
  resourceUrl: string;

  @OneToMany(() => ScheduledCourse, ScheduledCourse => ScheduledCourse.course)
  schdeuledCourses: ScheduledCourse[];

  @ManyToMany(() => CourseTag)
  @JoinTable({
    name: 'courses_tags',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'course_tag_id' }
  })
  tags: CourseTag[];

}
