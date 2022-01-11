/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHousehold = /* GraphQL */ `
  query GetHousehold($id: ID!) {
    getHousehold(id: $id) {
      id
      Guests {
        nextToken
        startedAt
      }
      addressLine1
      addressLine2
      city
      state
      zipcode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listHouseholds = /* GraphQL */ `
  query ListHouseholds(
    $filter: ModelHouseholdFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        addressLine1
        addressLine2
        city
        state
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHouseholds = /* GraphQL */ `
  query SyncHouseholds(
    $filter: ModelHouseholdFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHouseholds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        addressLine1
        addressLine2
        city
        state
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getGuest = /* GraphQL */ `
  query GetGuest($id: ID!) {
    getGuest(id: $id) {
      id
      prefix
      firstName
      lastName
      suffix
      familyID
      hasPlusOne
      withBride
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prefix
        firstName
        lastName
        suffix
        familyID
        hasPlusOne
        withBride
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGuests = /* GraphQL */ `
  query SyncGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGuests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        prefix
        firstName
        lastName
        suffix
        familyID
        hasPlusOne
        withBride
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
