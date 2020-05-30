import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRule, deleteRule, updateRule } from "../graphql/mutations";
import MaterialTable from "material-table";

const Rules = ({ fetchRules, rules, rulesLoading }) => {
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
              render: (rowData) => (
                <>
                  {rowData.can_come_before.map((item, index) =>
                    item.length ? <li key={index}>{item}</li> : ""
                  )}
                </>
              ),
            },
            {
              title: "Can Come After",
              field: "can_come_after",
              render: (rowData) => (
                <>
                  {rowData.can_come_after.map((item, index) =>
                    item.length ? <li key={index}>{item}</li> : ""
                  )}
                </>
              ),
            },
            {
              title: "Cannot Come Before",
              field: "cannot_come_before",
              render: (rowData) => (
                <>
                  {rowData.cannot_come_before.map((item, index) =>
                    item.length ? <li key={index}>{item}</li> : ""
                  )}
                </>
              ),
            },
            {
              title: "Cannot Come After",
              field: "cannot_come_after",
              render: (rowData) => (
                <>
                  {rowData.cannot_come_after.map((item, index) =>
                    item.length ? <li key={index}>{item}</li> : ""
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
