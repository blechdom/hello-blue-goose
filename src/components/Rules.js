import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRule } from "../graphql/mutations";
import { listRules } from "../graphql/queries";
import MaterialTable from "material-table";

const initialRuleState = {
  name: "",
  can_come_before: [],
  can_come_after: [],
  cannot_come_before: [],
  cannot_come_after: [],
};

const Rules = () => {
  const [ruleState, setRuleState] = useState(initialRuleState);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchRules();
  }, []);

  function setRuleInput(key, value) {
    setRuleState({ ...ruleState, [key]: value });
  }

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
  async function updateRule(rule) {
    console.log("update ", rule);

    try {
      if (!rule.name) return;
      await API.graphql(graphqlOperation(updateRule, { input: rule }));
      // setRules([...rules, rule]);
    } catch (err) {
      console.log("error updating rule:", err);
    }
  }
  async function deleteRule(rule) {
    console.log("delete ", rule);
    // delete rule.tableData;
    try {
      // if (!rule.name) return;
      await API.graphql(
        graphqlOperation(deleteRule, { input: { id: rule.id } })
      );
      // fetchRules();
      // setRules([...rules, rule]);
    } catch (err) {
      console.log("error deleting rule:", err);
    }
  }

  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Can Come Before", field: "can_come_before" },
      { title: "Can Come After", field: "can_come_after" },
      { title: "Cannot Come Before", field: "cannot_come_before" },
      { title: "Cannot Come After", field: "cannot_come_after" },
    ],
  });

  return (
    <MaterialTable
      title="Rules Data"
      columns={state.columns}
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
              updateRule(newData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              deleteRule(oldData);
            }, 600);
          }),
      }}
    />
  );
};

export default Rules;
