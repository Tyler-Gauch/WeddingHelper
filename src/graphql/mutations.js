/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWedding = /* GraphQL */ `
  mutation CreateWedding(
    $input: CreateWeddingInput!
    $condition: ModelWeddingConditionInput
  ) {
    createWedding(input: $input, condition: $condition) {
      id
      name
      Households {
        nextToken
        startedAt
      }
      Guests {
        nextToken
        startedAt
      }
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWedding = /* GraphQL */ `
  mutation UpdateWedding(
    $input: UpdateWeddingInput!
    $condition: ModelWeddingConditionInput
  ) {
    updateWedding(input: $input, condition: $condition) {
      id
      name
      Households {
        nextToken
        startedAt
      }
      Guests {
        nextToken
        startedAt
      }
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWedding = /* GraphQL */ `
  mutation DeleteWedding(
    $input: DeleteWeddingInput!
    $condition: ModelWeddingConditionInput
  ) {
    deleteWedding(input: $input, condition: $condition) {
      id
      name
      Households {
        nextToken
        startedAt
      }
      Guests {
        nextToken
        startedAt
      }
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createHousehold = /* GraphQL */ `
  mutation CreateHousehold(
    $input: CreateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    createHousehold(input: $input, condition: $condition) {
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
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateHousehold = /* GraphQL */ `
  mutation UpdateHousehold(
    $input: UpdateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    updateHousehold(input: $input, condition: $condition) {
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
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteHousehold = /* GraphQL */ `
  mutation DeleteHousehold(
    $input: DeleteHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    deleteHousehold(input: $input, condition: $condition) {
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
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createGuest = /* GraphQL */ `
  mutation CreateGuest(
    $input: CreateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    createGuest(input: $input, condition: $condition) {
      id
      prefix
      firstName
      lastName
      suffix
      householdId
      hasPlusOne
      withBride
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
      id
      prefix
      firstName
      lastName
      suffix
      householdId
      hasPlusOne
      withBride
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
      id
      prefix
      firstName
      lastName
      suffix
      householdId
      hasPlusOne
      withBride
      weddingID
      authorizedUsers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
