// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Household, Guest } = initSchema(schema);

export {
  Household,
  Guest
};