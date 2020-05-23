import React, { useState } from "react";
import MaterialTable from "material-table";

const RulesTable = (props) => {
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
      data={props.rules}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

export default RulesTable;
