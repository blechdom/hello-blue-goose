import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  createInstruction,
  updateInstruction,
  deleteInstruction,
} from "../graphql/mutations";
import MaterialTable from "material-table";

const Instructions = ({
  fetchInstructions,
  instructions,
  instructionsLoading,
}) => {
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
    <>
      {instructionsLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialTable
          title="Instruction Data"
          columns={[
            { title: "ID", field: "id", editable: "never" },
            { title: "Name", field: "name" },
            { title: "Media Type", field: "media_type" },
            { title: "URL", field: "url" },
            { title: "Spoken Text", field: "spoken_text" },
          ]}
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
      )}
    </>
  );
};

export default Instructions;
