import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createInstruction } from "../graphql/mutations";
import { listInstructions } from "../graphql/queries";
import { createRule } from "../graphql/mutations";
import { listRules } from "../graphql/queries";

const initialInstructionState = {
  name: "",
  media_type: "",
  url: "",
  spoken_text: "",
};
const initialRuleState = {
  name: "",
  can_come_before: "",
  can_come_after: "",
  cannot_come_before: "",
  cannot_come_after: "",
};

const Make = () => {
  const [instructionState, setInstructionState] = useState(
    initialInstructionState
  );
  const [instructions, setInstructions] = useState([]);
  const [ruleState, setRuleState] = useState(initialRuleState);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchInstructions();
    fetchRules();
  }, []);

  function setInstructionInput(key, value) {
    setInstructionState({ ...instructionState, [key]: value });
  }
  function setRuleInput(key, value) {
    setRuleState({ ...ruleState, [key]: value });
  }

  async function fetchInstructions() {
    try {
      const instructionData = await API.graphql(
        graphqlOperation(listInstructions)
      );
      const instructions = instructionData.data.listInstructions.items;
      setInstructions(instructions);
    } catch (err) {
      console.log("error fetching instructions");
    }
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

  async function addInstruction() {
    try {
      if (!instructionState.name || !instructionState.media_type) return;
      const instruction = { ...instructionState };
      setInstructions([...instructions, instruction]);
      setInstructionState(initialInstructionState);
      await API.graphql(
        graphqlOperation(createInstruction, { input: instruction })
      );
    } catch (err) {
      console.log("error creating instruction:", err);
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
    <div style={styles.container}>
      <h2>Create Instruction</h2>
      <input
        onChange={(event) => setInstructionInput("name", event.target.value)}
        style={styles.input}
        value={instructionState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) =>
          setInstructionInput("media_type", event.target.value)
        }
        style={styles.input}
        value={instructionState.media_type}
        placeholder="Media Type"
      />
      <input
        onChange={(event) => setInstructionInput("url", event.target.value)}
        style={styles.input}
        value={instructionState.url}
        placeholder="URL"
      />
      <input
        onChange={(event) =>
          setInstructionInput("spoken_text", event.target.value)
        }
        style={styles.input}
        value={instructionState.spoken_text}
        placeholder="Spoken Text"
      />
      <button style={styles.button} onClick={addInstruction}>
        Create Instruction
      </button>
      <h2>Create Rule</h2>
      <input
        onChange={(event) => setRuleInput("name", event.target.value)}
        style={styles.input}
        value={ruleState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) =>
          setRuleInput("can_come_before", event.target.value)
        }
        style={styles.input}
        value={ruleState.can_come_before}
        placeholder="Can Come Before"
      />
      <input
        onChange={(event) => setRuleInput("can_come_after", event.target.value)}
        style={styles.input}
        value={ruleState.can_come_after}
        placeholder="Can Come AFter"
      />
      <input
        onChange={(event) =>
          setRuleInput("cannot_come_before", event.target.value)
        }
        style={styles.input}
        value={ruleState.cannot_come_before}
        placeholder="Cannot Come Before"
      />
      <input
        onChange={(event) =>
          setRuleInput("cannot_come_after", event.target.value)
        }
        style={styles.input}
        value={ruleState.cannot_come_after}
        placeholder="Cannot Come AFter"
      />
      <button style={styles.button} onClick={addRule}>
        Create Rule
      </button>
      {instructions.map((instruction, index) => (
        <div
          key={instruction.id ? instruction.id : index}
          style={styles.instruction}
        >
          <p style={styles.instructionName}>{instruction.name}</p>
          <p style={styles.instructionMediaType}>{instruction.media_type}</p>
          <p style={styles.instructionMediaType}>{instruction.url}</p>
          <p style={styles.instructionMediaType}>{instruction.spoken_text}</p>
        </div>
      ))}
      {rules.map((rule, index) => (
        <div key={rule.id ? rule.id : index} style={styles.rule}>
          <p style={styles.instructionName}>{rule.name}</p>
          <p style={styles.instructionMediaType}>{rule.can_come_before}</p>
          <p style={styles.instructionMediaType}>{rule.can_come_after}</p>
          <p style={styles.instructionMediaType}>{rule.cannot_come_before}</p>
          <p style={styles.instructionMediaType}>{rule.cannot_come_after}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  instruction: { marginBottom: 5 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  instructionName: { fontSize: 20, fontWeight: "bold" },
  instructionMediaType: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default Make;
