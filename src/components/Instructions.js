import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  createInstruction,
  updateInstruction,
  deleteInstruction,
} from "../graphql/mutations";
import { listInstructions } from "../graphql/queries";
import MaterialTable from "material-table";

const Instructions = () => {
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Media Type", field: "media_type" },
    { title: "URL", field: "url" },
    { title: "Spoken Text", field: "spoken_text" },
  ]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetchInstructions();
  }, []);

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

  async function addInstruction(instruction) {
    try {
      if (!instruction.name || !instruction.media_type) return;
      await API.graphql(
        graphqlOperation(createInstruction, { input: instruction })
      );
      fetchInstructions();
    } catch (err) {
      console.log("error creating instruction:", err);
    }
  }

  async function removeInstruction(id) {
    try {
      await API.graphql(graphqlOperation(deleteInstruction, { input: { id } }));
      fetchInstructions();
    } catch (err) {
      console.log("error deleting instruction:", err);
    }
  }

  async function updateTheInstruction(instruction) {
    try {
      if (!instruction.name || !instruction.media_type) return;
      delete instruction.createdAt;
      delete instruction.updatedAt;
      await API.graphql(
        graphqlOperation(updateInstruction, { input: instruction })
      );
      fetchInstructions();
    } catch (err) {
      console.log("error deleting instruction:", err);
    }
  }

  return (
    <MaterialTable
      title="Instruction Data"
      columns={columns}
      data={instructions}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              addInstruction(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              updateTheInstruction(newData);
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              removeInstruction(oldData.id);
            }, 600);
          }),
      }}
    />
  );
};

export default Instructions;
