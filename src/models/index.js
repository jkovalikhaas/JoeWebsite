// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Words } = initSchema(schema);

export {
  Words
};