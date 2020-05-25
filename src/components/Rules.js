import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRule, deleteRule, updateRule } from "../graphql/mutations";
import { listRules } from "../graphql/queries";
import MaterialTable from "material-table";

const Rules = () => {
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Can Come Before", field: "can_come_before" },
    { title: "Can Come After", field: "can_come_after" },
    { title: "Cannot Come Before", field: "cannot_come_before" },
    { title: "Cannot Come After", field: "cannot_come_after" },
  ]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchRules();
  }, []);

  async function fetchRules() {
    try {
      const ruleData = await API.graphql(graphqlOperation(listRules));
      const rules = ruleData.data.listRules.items;
      setRules(rules);
    } catch (err) {
      console.log("error fetching rules");
    }
  }

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
    <MaterialTable
      title="Rules Data"
      columns={columns}
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
  );
};

export default Rules;
