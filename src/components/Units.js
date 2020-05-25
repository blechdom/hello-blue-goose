import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createUnit, deleteUnit, updateUnit } from "../graphql/mutations";
import { listUnits } from "../graphql/queries";
import MaterialTable from "material-table";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Units = () => {
  const [columns] = useState([
    {
      title: "Unit Type",
      field:
        "unit_type" /* ,
      editComponent: (rowData) => unitTypeDropDown(rowData),*/,
    },
    { title: "Name", field: "name" },
    { title: "SVG", field: "svg" },
    { title: "Hex Color", field: "hex_color" },
  ]);

  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchUnits();
  }, []);

  function handleChange() {
    console.log("handling change");
  }
  function unitTypeDropDown(rowData) {
    console.log("row data ", rowData);
    return (
      <>
        <Select value={rowData.unit_type} onChange={handleChange}>
          <MenuItem></MenuItem>
          <MenuItem value="color">color</MenuItem>
          <MenuItem value="shape">shape</MenuItem>
          <MenuItem value="category">category</MenuItem>
          <MenuItem value="thing">thing</MenuItem>
        </Select>
      </>
    );
  }

  async function fetchUnits() {
    try {
      const unitData = await API.graphql(graphqlOperation(listUnits));
      const units = unitData.data.listUnits.items;
      setUnits(units);
    } catch (err) {
      console.log("error fetching units");
    }
  }

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
    <MaterialTable
      title="Units Data"
      columns={columns}
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
  );
};

export default Units;
