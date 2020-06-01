import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createUnit, deleteUnit, updateUnit } from "../graphql/mutations";
import MaterialTable from "material-table";

const unit_types = {
  color: "color",
  shape: "shape",
  category: "category",
  thing: "thing",
  action: "action",
  effect: "effect",
  variable: "variable",
};

const Units = ({ fetchUnits, units, unitsLoading, categories }) => {
  async function addUnit(unit) {
    try {
      if (!unit.name) return;
      await API.graphql(graphqlOperation(createUnit, { input: unit }));
      fetchUnits();
    } catch (err) {
      console.log("error creating unit:", err);
    }
  }
  async function updateTheUnit(unit) {
    try {
      if (!unit.name) return;
      delete unit.createdAt;
      delete unit.updatedAt;
      await API.graphql(graphqlOperation(updateUnit, { input: unit }));
      fetchUnits();
    } catch (err) {
      console.log("error updating unit:", err);
    }
  }
  async function removeUnit(id) {
    try {
      await API.graphql(graphqlOperation(deleteUnit, { input: { id } }));
      fetchUnits();
    } catch (err) {
      console.log("error deleting unit:", err);
    }
  }

  return (
    <>
      {unitsLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialTable
          title="Units Data"
          columns={[
            { title: "ID", field: "id", editable: "never" },
            { title: "Unit Type", field: "unit_type", lookup: unit_types },
            { title: "Category", field: "category", lookup: categories },
            { title: "Name", field: "name" },
            { title: "SVG", field: "svg" },
            { title: "Hex Color", field: "hex_color" },
            { title: "Image URL", field: "image_url" },
            { title: "Spoken Text", field: "spoken_text" },
            { title: "Sound URL", field: "sound_url" },
          ]}
          data={units}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                console.log(newData);
                setTimeout(() => {
                  resolve();
                  addUnit(newData);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                console.log(newData);
                setTimeout(() => {
                  resolve();
                  updateTheUnit(newData);
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  removeUnit(oldData.id);
                }, 600);
              }),
          }}
        />
      )}
    </>
  );
};

export default Units;
