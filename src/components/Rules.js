import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRule, deleteRule, updateRule } from "../graphql/mutations";
import MaterialTable from "material-table";

const Rules = ({ fetchRules, rules, rulesLoading, instructionsList }) => {
  async function addRule(rule) {
    try {
      if (!rule.name) return;
      await API.graphql(graphqlOperation(createRule, { input: rule }));
      fetchRules();
    } catch (err) {
      console.log("error creating rule:", err);
    }
  }
  async function updateTheRule(rule) {
    try {
      if (!rule.name) return;
      delete rule.createdAt;
      delete rule.updatedAt;
      await API.graphql(graphqlOperation(updateRule, { input: rule }));
      fetchRules();
    } catch (err) {
      console.log("error updating rule:", err);
    }
  }
  async function removeRule(id) {
    try {
      await API.graphql(graphqlOperation(deleteRule, { input: { id } }));
      fetchRules();
    } catch (err) {
      console.log("error deleting rule:", err);
    }
  }

  return (
    <>
      {rulesLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialTable
          title="Rules Data"
          columns={[
            { title: "ID", field: "id", editable: "never" },
            { title: "Name", field: "name" },
            {
              title: "Can Come Before",
              field: "can_come_before",
              lookup: instructionsList,
              render: (rowData) => (
                <>
                  {rowData.can_come_before.map((item, index) =>
                    item.length ? (
                      <li key={index}>{instructionsList[item]}</li>
                    ) : (
                      ""
                    )
                  )}
                </>
              ),
            },
            {
              title: "Can Come After",
              field: "can_come_after",
              lookup: instructionsList,
              render: (rowData) => (
                <>
                  {rowData.can_come_after.map((item, index) =>
                    item.length ? (
                      <li key={index}>{instructionsList[item]}</li>
                    ) : (
                      ""
                    )
                  )}
                </>
              ),
            },
            {
              title: "Cannot Come Before",
              field: "cannot_come_before",
              lookup: instructionsList,
              render: (rowData) => (
                <>
                  {rowData.cannot_come_before.map((item, index) =>
                    item.length ? (
                      <li key={index}>{instructionsList[item]}</li>
                    ) : (
                      ""
                    )
                  )}
                </>
              ),
            },
            {
              title: "Cannot Come After",
              field: "cannot_come_after",
              lookup: instructionsList,
              render: (rowData) => (
                <>
                  {rowData.cannot_come_after.map((item, index) =>
                    item.length ? (
                      <li key={index}>{instructionsList[item]}</li>
                    ) : (
                      ""
                    )
                  )}
                </>
              ),
            },
          ]}
          data={rules}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  addRule(newData);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData.can_come_before) {
                    let canComeBeforeArray = [...oldData.can_come_before];
                    if (typeof newData.can_come_before === "string")
                      canComeBeforeArray.push(newData.can_come_before);
                    newData.can_come_before = canComeBeforeArray;
                  }
                  if (oldData.can_come_after) {
                    let canComeAfterArray = [...oldData.can_come_after];
                    if (typeof newData.can_come_after === "string")
                      canComeAfterArray.push(newData.can_come_after);
                    newData.can_come_after = canComeAfterArray;
                  }
                  if (oldData.cannot_come_before) {
                    let cannotComeBeforeArray = [...oldData.cannot_come_before];
                    if (typeof newData.cannot_come_before === "string")
                      cannotComeBeforeArray.push(newData.cannot_come_before);
                    newData.cannot_come_before = cannotComeBeforeArray;
                  }
                  if (oldData.cannot_come_after) {
                    let cannotComeAfterArray = [...oldData.cannot_come_after];
                    if (typeof newData.cannot_come_after === "string")
                      cannotComeAfterArray.push(newData.cannot_come_after);
                    newData.cannot_come_after = cannotComeAfterArray;
                  }
                  updateTheRule(newData);
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  removeRule(oldData.id);
                }, 600);
              }),
          }}
        />
      )}
    </>
  );
};

export default Rules;
