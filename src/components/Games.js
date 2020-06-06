import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createGame, deleteGame, updateGame } from "../graphql/mutations";
import MaterialTable from "material-table";

const Games = ({
  fetchGames,
  games,
  gamesLoading,
  colors,
  shapes,
  categories,
  things,
  effects,
  actions,
  variables,
}) => {
  async function addGame(game) {
    try {
      if (!game.name) return;
      await API.graphql(graphqlOperation(createGame, { input: game }));
      fetchGames();
    } catch (err) {
      console.log("error creating game:", err);
    }
  }
  async function updateTheGame(game) {
    try {
      if (!game.name) return;
      delete game.createdAt;
      delete game.updatedAt;
      await API.graphql(graphqlOperation(updateGame, { input: game }));
      fetchGames();
    } catch (err) {
      console.log("error updating game:", err);
    }
  }

  async function removeGame(id) {
    try {
      await API.graphql(graphqlOperation(deleteGame, { input: { id } }));
      fetchGames();
    } catch (err) {
      console.log("error deleting game:", err);
    }
  }

  function getRowList(rowData, unit_type, unit_list) {
    if (rowData[unit_type]) {
      return (
        <>
          {rowData[unit_type].map((item, index) => {
            if (item.length) {
              return <li key={index}>{unit_list[item]}</li>;
            } else return <></>;
          })}
        </>
      );
    } else return;
  }

  return (
    <>
      {gamesLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialTable
          title="Games Data"
          columns={[
            { title: "ID", field: "id", editable: "never" },
            { title: "Name", field: "name" },
            { title: "Play Type", field: "play_type" },
            {
              title: "Colors",
              field: "colors",
              lookup: colors,
              render: (rowData) => getRowList(rowData, "colors", colors),
            },
            {
              title: "Shapes",
              field: "shapes",
              lookup: shapes,
              render: (rowData) => getRowList(rowData, "shapes", shapes),
            },
            {
              title: "Categories",
              field: "categories",
              lookup: categories,
              render: (rowData) =>
                getRowList(rowData, "categories", categories),
            },
            {
              title: "Things",
              field: "things",
              lookup: things,
              render: (rowData) => getRowList(rowData, "things", things),
            },
            {
              title: "Actions",
              field: "actions",
              lookup: actions,
              render: (rowData) => getRowList(rowData, "actions", actions),
            },
            {
              title: "Effects",
              field: "effects",
              lookup: effects,
              render: (rowData) => getRowList(rowData, "effects", effects),
            },
            {
              title: "Variables",
              field: "variables",
              lookup: variables,
              render: (rowData) => getRowList(rowData, "variables", variables),
            },
          ]}
          data={games}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  addGame(newData);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData.colors) {
                    let colorsArray = [...oldData.colors];
                    if (typeof newData.colors === "string")
                      colorsArray.push(newData.colors);
                    newData.colors = colorsArray;
                  }
                  if (oldData.shapes) {
                    let shapesArray = [...oldData.shapes];
                    if (typeof newData.shapes === "string")
                      shapesArray.push(newData.shapes);
                    newData.shapes = shapesArray;
                  }
                  if (oldData.categories) {
                    let categoriesArray = [...oldData.categories];
                    if (typeof newData.categories === "string")
                      categoriesArray.push(newData.categories);
                    newData.categories = categoriesArray;
                  }
                  if (oldData.things) {
                    let thingsArray = [...oldData.things];
                    if (typeof newData.things === "string")
                      thingsArray.push(newData.things);
                    newData.things = thingsArray;
                  }
                  if (oldData.actions) {
                    let actionsArray = [...oldData.actions];
                    if (typeof newData.actions === "string")
                      actionsArray.push(newData.actions);
                    newData.actions = actionsArray;
                  }
                  if (oldData.effects) {
                    let effectsArray = [...oldData.effects];
                    if (typeof newData.effects === "string")
                      effectsArray.push(newData.effects);
                    newData.effects = effectsArray;
                  }
                  if (oldData.variables) {
                    let variablesArray = [...oldData.variables];
                    if (typeof newData.variables === "string")
                      variablesArray.push(newData.variables);
                    newData.variables = variablesArray;
                  }
                  updateTheGame(newData);
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  removeGame(oldData.id);
                }, 600);
              }),
          }}
        />
      )}
    </>
  );
};

export default Games;
