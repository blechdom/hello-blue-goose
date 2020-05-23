import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createInstruction } from "../graphql/mutations";
import { listInstructions } from "../graphql/queries";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const initialInstructionState = {
  name: "",
  media_type: "",
  url: "",
  spoken_text: "",
};

const Instructions = () => {
  const classes = useStyles();

  const [instructionState, setInstructionState] = useState(
    initialInstructionState
  );
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetchInstructions();
  }, []);

  function setInstructionInput(key, value) {
    setInstructionState({ ...instructionState, [key]: value });
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

  return (
    <div style={styles.container}>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        <form className={classes.root} noValidate autoComplete="off">
          <h2>Create Instruction</h2>
          <TextField
            onChange={(event) =>
              setInstructionInput("name", event.target.value)
            }
            value={instructionState.name}
            label="Name"
          />
          <TextField
            onChange={(event) =>
              setInstructionInput("media_type", event.target.value)
            }
            value={instructionState.media_type}
            label="Media Type"
          />
          <TextField
            onChange={(event) => setInstructionInput("url", event.target.value)}
            value={instructionState.url}
            label="URL"
          />
          <TextField
            onChange={(event) =>
              setInstructionInput("spoken_text", event.target.value)
            }
            value={instructionState.spoken_text}
            label="Spoken Text"
          />
          <Button onClick={addInstruction} variant="contained" color="primary">
            Create Instruction
          </Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="center" m={2} p={2}>
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
      </Box>
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

export default Instructions;
