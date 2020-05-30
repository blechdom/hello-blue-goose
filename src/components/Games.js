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
                console.log("rowData ", rowData);
                return (
                  <>
                    {rowData.colors.map((item, index) =>
                      item.length ? <li key={index}>{item}</li> : ""
                    )}
                  </>
                );
              },
            },
            { title: "Shapes", field: "shapes", lookup: shapes },
            { title: "Categories", field: "categories", lookup: categories },
            { title: "Things", field: "things", lookup: things },
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
                  console.log("field: ", oldData);
                  let colorsArray = [...oldData.colors];
                  colorsArray.push(newData.colors);
                  newData.colors = colorsArray;
                  // console.log("colors array ", colorsArray);
                  // console.log("udpate old data ", oldData);
                  // console.log("udpate new data ", newData);
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
