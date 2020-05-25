import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createGame, deleteGame, updateGame } from "../graphql/mutations";
import { listGames } from "../graphql/queries";
import MaterialTable from "material-table";

const Games = () => {
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Play Type", field: "play_type" },
    { title: "Colors", field: "colors" },
    { title: "Shapes", field: "shapes" },
    { title: "Categories", field: "categories" },
    { title: "Things", field: "things" },
  ]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const gameData = await API.graphql(graphqlOperation(listGames));
      const games = gameData.data.listGames.items;
      setGames(games);
    } catch (err) {
      console.log("error fetching games");
    }
  }

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
    <MaterialTable
      title="Games Data"
      columns={columns}
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
  );
};

export default Games;
