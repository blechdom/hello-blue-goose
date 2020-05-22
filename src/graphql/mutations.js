/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createInstructions = /* GraphQL */ `
  mutation CreateInstructions(
    $input: CreateInstructionsInput!
    $condition: ModelInstructionsConditionInput
  ) {
    createInstructions(input: $input, condition: $condition) {
      id
      name
      spoken_text
      createdAt
      updatedAt
    }
  }
`;
export const updateInstructions = /* GraphQL */ `
  mutation UpdateInstructions(
    $input: UpdateInstructionsInput!
    $condition: ModelInstructionsConditionInput
  ) {
    updateInstructions(input: $input, condition: $condition) {
      id
      name
      spoken_text
      createdAt
      updatedAt
    }
  }
`;
export const deleteInstructions = /* GraphQL */ `
  mutation DeleteInstructions(
    $input: DeleteInstructionsInput!
    $condition: ModelInstructionsConditionInput
  ) {
    deleteInstructions(input: $input, condition: $condition) {
      id
      name
      spoken_text
      createdAt
      updatedAt
    }
  }
`;
export const createRules = /* GraphQL */ `
  mutation CreateRules(
    $input: CreateRulesInput!
    $condition: ModelRulesConditionInput
  ) {
    createRules(input: $input, condition: $condition) {
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
export const updateRules = /* GraphQL */ `
  mutation UpdateRules(
    $input: UpdateRulesInput!
    $condition: ModelRulesConditionInput
  ) {
    updateRules(input: $input, condition: $condition) {
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
export const deleteRules = /* GraphQL */ `
  mutation DeleteRules(
    $input: DeleteRulesInput!
    $condition: ModelRulesConditionInput
  ) {
    deleteRules(input: $input, condition: $condition) {
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
