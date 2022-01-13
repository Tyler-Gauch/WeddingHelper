// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Wedding, Household, Guest } = initSchema(schema);

export {
  Wedding,
  Household,
  Guest
};