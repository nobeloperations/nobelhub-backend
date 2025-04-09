import { CREATE_RECORD } from './operations/create-record.doc';
import { GET_RECORD_BY_ID } from './operations/get-record-by-id.doc';
import { GET_RECORDS_LIST } from './operations/get-records-list.doc';
import { UPDATE_RECORD_BY_ID } from './operations/update-record-by-id';
import { DELETE_RECORD_BY_ID } from './operations/delete-record-by-id.doc';

export const INTAKE_RESOURCE_NAME = 'intekes';

export const INTAKE_OPERATIONS_DOCS = {
  tag: 'Intakes',
  description:
    'Handles intake-related actions including creation, updating, deletion, retrieval by ID, and listing of intakes',
  operations: [
    CREATE_RECORD,
    GET_RECORD_BY_ID,
    GET_RECORDS_LIST,
    DELETE_RECORD_BY_ID,
    UPDATE_RECORD_BY_ID
  ]
};
