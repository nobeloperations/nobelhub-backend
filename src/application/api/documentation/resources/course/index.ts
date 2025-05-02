import { CREATE_RECORD } from './operations/create-record.doc';
import { GET_COURSE_BY_ID } from './operations/get-record-by-id.doc';
import { GET_COURSES_LIST } from './operations/get-records-list.doc';
import { UPDATE_COURSE_BY_ID } from './operations/update-record-by-id';
import { DELETE_COURSES_BY_ID } from './operations/delete-record-by-id.doc';

export const COURSE_RESOURCE_NAME = 'course';

export const COURSE_OPERATIONS_DOCS = {
  tag: 'Courses',
  description:
    'Handles Course-related actions including creation, updating, deletion, retrieval by ID, and listing of all courses.',
  operations: [
    CREATE_RECORD,
    GET_COURSE_BY_ID,
    GET_COURSES_LIST,
    DELETE_COURSES_BY_ID,
    UPDATE_COURSE_BY_ID
  ]
};
