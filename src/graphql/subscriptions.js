/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWedding = /* GraphQL */ `
  subscription OnCreateWedding {
    onCreateWedding {
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
export const onUpdateWedding = /* GraphQL */ `
  subscription OnUpdateWedding {
    onUpdateWedding {
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
export const onDeleteWedding = /* GraphQL */ `
  subscription OnDeleteWedding {
    onDeleteWedding {
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
export const onCreateHousehold = /* GraphQL */ `
  subscription OnCreateHousehold {
    onCreateHousehold {
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
export const onUpdateHousehold = /* GraphQL */ `
  subscription OnUpdateHousehold {
    onUpdateHousehold {
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
export const onDeleteHousehold = /* GraphQL */ `
  subscription OnDeleteHousehold {
    onDeleteHousehold {
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
export const onCreateGuest = /* GraphQL */ `
  subscription OnCreateGuest {
    onCreateGuest {
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
export const onUpdateGuest = /* GraphQL */ `
  subscription OnUpdateGuest {
    onUpdateGuest {
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
export const onDeleteGuest = /* GraphQL */ `
  subscription OnDeleteGuest {
    onDeleteGuest {
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
