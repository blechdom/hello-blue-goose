import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createRule } from "../graphql/mutations";
import { listRules } from "../graphql/queries";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
import RulesTable from "./RulesTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  table: {
    minWidth: 650,
  },
}));

const initialRuleState = {
  name: "",
  can_come_before: "",
  can_come_after: "",
  cannot_come_before: "",
  cannot_come_after: "",
};

const Rules = () => {
  const classes = useStyles();
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

  async function addRule() {
    try {
      if (!ruleState.name) return;
      const rule = { ...ruleState };
      setRules([...rules, rule]);
      setRuleState(initialRuleState);
      await API.graphql(graphqlOperation(createRule, { input: rule }));
    } catch (err) {
      console.log("error creating rule:", err);
    }
  }

  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        <form className={classes.root} noValidate autoComplete="off">
          <h2>Create Rule</h2>
          <TextField
            onChange={(event) => setRuleInput("name", event.target.value)}
            value={ruleState.name}
            label="Name"
          />
          <TextField
            onChange={(event) =>
              setRuleInput("can_come_before", event.target.value)
            }
            value={ruleState.can_come_before}
            label="Can Come Before"
          />
          <TextField
            onChange={(event) =>
              setRuleInput("can_come_after", event.target.value)
            }
            value={ruleState.can_come_after}
            label="Can Come AFter"
          />
          <TextField
            onChange={(event) =>
              setRuleInput("cannot_come_before", event.target.value)
            }
            value={ruleState.cannot_come_before}
            label="Cannot Come Before"
          />
          <TextField
            onChange={(event) =>
              setRuleInput("cannot_come_after", event.target.value)
            }
            value={ruleState.cannot_come_after}
            label="Cannot Come AFter"
          />
          <Button onClick={addRule} variant="contained" color="primary">
            Create Rule
          </Button>
        </form>
      </Box>
      <RulesTable rules={rules} />
    </div>
  );
};

export default Rules;
