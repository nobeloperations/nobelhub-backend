import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('course_tags')
export class CourseTag extends BaseEntity {
  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;
}
