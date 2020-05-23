/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
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
