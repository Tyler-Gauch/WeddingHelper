import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type HouseholdMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GuestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Household {
  readonly id: string;
  readonly Guests?: (Guest | null)[];
  readonly addressLine1?: string;
  readonly addressLine2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zipcode?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Household, HouseholdMetaData>);
  static copyOf(source: Household, mutator: (draft: MutableModel<Household, HouseholdMetaData>) => MutableModel<Household, HouseholdMetaData> | void): Household;
}

export declare class Guest {
  readonly id: string;
  readonly prefix?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly suffix?: string;
  readonly householdId?: string;
  readonly hasPlusOne?: boolean;
  readonly withBride?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Guest, GuestMetaData>);
  static copyOf(source: Guest, mutator: (draft: MutableModel<Guest, GuestMetaData>) => MutableModel<Guest, GuestMetaData> | void): Guest;
}