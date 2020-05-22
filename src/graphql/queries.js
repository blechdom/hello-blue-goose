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
export const getInstructions = /* GraphQL */ `
  query GetInstructions($id: ID!) {
    getInstructions(id: $id) {
      id
      name
      spoken_text
      createdAt
      updatedAt
    }
  }
`;
export const listInstructionss = /* GraphQL */ `
  query ListInstructionss(
    $filter: ModelInstructionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstructionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        spoken_text
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRules = /* GraphQL */ `
  query GetRules($id: ID!) {
    getRules(id: $id) {
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
export const listRuless = /* GraphQL */ `
  query ListRuless(
    $filter: ModelRulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRuless(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
