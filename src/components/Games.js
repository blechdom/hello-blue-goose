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
              render: (rowData) => {
                return (
                  <>
                    {rowData.colors.map((item, index) =>
                      item.length ? <li key={index}>{colors[item]}</li> : ""
                    )}
                  </>
                );
              },
            },
            {
              title: "Shapes",
              field: "shapes",
              lookup: shapes,
              render: (rowData) => {
                return (
                  <>
                    {rowData.shapes.map((item, index) =>
                      item.length ? <li key={index}>{shapes[item]}</li> : ""
                    )}
                  </>
                );
              },
            },
            {
              title: "Categories",
              field: "categories",
              lookup: categories,
              render: (rowData) => {
                return (
                  <>
                    {rowData.categories.map((item, index) =>
                      item.length ? <li key={index}>{categories[item]}</li> : ""
                    )}
                  </>
                );
              },
            },
            {
              title: "Things",
              field: "things",
              lookup: things,
              render: (rowData) => {
                return (
                  <>
                    {rowData.things.map((item, index) =>
                      item.length ? <li key={index}>{things[item]}</li> : ""
                    )}
                  </>
                );
              },
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
                    console.log("newData ", typeof newData.things);
                    if (typeof newData.things === "string")
                      thingsArray.push(newData.things);
                    newData.things = thingsArray;
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
