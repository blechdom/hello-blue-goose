/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      play_type
      colors
      shapes
      categories
      things
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        play_type
        colors
        shapes
        categories
        things
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInstruction = /* GraphQL */ `
  query GetInstruction($id: ID!) {
    getInstruction(id: $id) {
      id
      name
      media_type
      url
      spoken_text
      createdAt
      updatedAt
    }
  }
`;
export const listInstructions = /* GraphQL */ `
  query ListInstructions(
    $filter: ModelInstructionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstructions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        media_type
        url
        spoken_text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRule = /* GraphQL */ `
  query GetRule($id: ID!) {
    getRule(id: $id) {
      id
      name
      can_come_before
      can_come_after
      cannot_come_before
      cannot_come_after
      createdAt
      updatedAt
    }
  }
`;
export const listRules = /* GraphQL */ `
  query ListRules(
    $filter: ModelRuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        can_come_before
        can_come_after
        cannot_come_before
        cannot_come_after
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
      id
      name
      unit_type
      category
      svg
      hex_color
      createdAt
      updatedAt
    }
  }
`;
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        unit_type
        category
        svg
        hex_color
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
