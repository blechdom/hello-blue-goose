/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInstruction = /* GraphQL */ `
  mutation CreateInstruction(
    $input: CreateInstructionInput!
    $condition: ModelInstructionConditionInput
  ) {
    createInstruction(input: $input, condition: $condition) {
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
export const updateInstruction = /* GraphQL */ `
  mutation UpdateInstruction(
    $input: UpdateInstructionInput!
    $condition: ModelInstructionConditionInput
  ) {
    updateInstruction(input: $input, condition: $condition) {
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
export const deleteInstruction = /* GraphQL */ `
  mutation DeleteInstruction(
    $input: DeleteInstructionInput!
    $condition: ModelInstructionConditionInput
  ) {
    deleteInstruction(input: $input, condition: $condition) {
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
export const createRule = /* GraphQL */ `
  mutation CreateRule(
    $input: CreateRuleInput!
    $condition: ModelRuleConditionInput
  ) {
    createRule(input: $input, condition: $condition) {
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
export const updateRule = /* GraphQL */ `
  mutation UpdateRule(
    $input: UpdateRuleInput!
    $condition: ModelRuleConditionInput
  ) {
    updateRule(input: $input, condition: $condition) {
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
export const deleteRule = /* GraphQL */ `
  mutation DeleteRule(
    $input: DeleteRuleInput!
    $condition: ModelRuleConditionInput
  ) {
    deleteRule(input: $input, condition: $condition) {
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
