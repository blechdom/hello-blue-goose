import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  listGames,
  listUnits,
  listRules,
  listInstructions,
} from "../graphql/queries";
import Games from "./Games";
import Instructions from "./Instructions";
import Rules from "./Rules";
import Units from "./Units";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Make = () => {
  const [games, setGames] = useState([]);
  const [rules, setRules] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [things, setThings] = useState([]);
  const [units, setUnits] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [instructionsLoading, setInstructionsLoading] = useState(false);
  const [rulesLoading, setRulesLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState(false);

  useEffect(() => {
    if (units.length) {
      setUnitsLoading(false);
      if (games.length) {
        setGamesLoading(false);
        parseUnitsForGames();
      } else {
        fetchGames();
      }
    } else {
      fetchUnits();
    }
  }, [games, units]);

  useEffect(() => {
    !instructions.length ? fetchInstructions() : setInstructionsLoading(false);
  }, [instructions]);

  useEffect(() => {
    !rules.length ? fetchRules() : setRulesLoading(false);
  }, [rules]);

  const fetchGames = async () => {
    setGamesLoading(true);
    try {
      const gameData = await API.graphql(graphqlOperation(listGames));
      const gamesData = gameData.data.listGames.items;
      setGames(gamesData);
    } catch (err) {
      console.log("error fetching games");
      setGamesLoading(false);
    }
  };

  const fetchUnits = async () => {
    setUnitsLoading(true);
    try {
      const unitData = await API.graphql(graphqlOperation(listUnits));
      const unitsData = unitData.data.listUnits.items;
      setUnits(unitsData);
    } catch (err) {
      console.log("error fetching units");
      setUnitsLoading(false);
    }
  };

  const fetchInstructions = async () => {
    console.log("fetching instructions ");
    setInstructionsLoading(true);
    try {
      const instructionData = await API.graphql(
        graphqlOperation(listInstructions)
      );
      const instructionsData = instructionData.data.listInstructions.items;
      setInstructions(instructionsData);
    } catch (err) {
      console.log("error fetching instructions");
      setInstructionsLoading(false);
    }
  };

  const fetchRules = async () => {
    setRulesLoading(true);
    try {
      const ruleData = await API.graphql(graphqlOperation(listRules));
      const rulesData = ruleData.data.listRules.items;
      setRules(rulesData);
    } catch (err) {
      console.log("error fetching rules");
      setRulesLoading(false);
    }
  };

  const parseUnitsForGames = () => {
    const gameColors = units.reduce(
      (a, o) => (o.unit_type === "color" && (a[o.id] = o.name), a),
      {}
    );
    setColors(gameColors);
    const gameShapes = units.reduce(
      (a, o) => (o.unit_type === "shape" && (a[o.id] = o.name), a),
      {}
    );
    setShapes(gameShapes);
    const gameCategories = units.reduce(
      (a, o) => (o.unit_type === "category" && (a[o.id] = o.name), a),
      {}
    );
    setCategories(gameCategories);
    const gameThings = units.reduce(
      (a, o) => (o.unit_type === "thing" && (a[o.id] = o.name), a),
      {}
    );
    setThings(gameThings);
  };

  const [value, setValue] = useState(0);
  const [tabContent, setTabContent] = useState();

  useEffect(() => {
    switch (value) {
      case 0:
        setTabContent(
          <Games
            fetchGames={fetchGames}
            games={games}
            gamesLoading={gamesLoading}
            colors={colors}
            shapes={shapes}
            categories={categories}
            things={things}
          />
        );
        break;
      case 1:
        setTabContent(
          <Instructions
            fetchInstructions={fetchInstructions}
            instructions={instructions}
            instructionsLoading={instructionsLoading}
          />
        );
        break;
      case 2:
        setTabContent(
          <Rules
            fetchRules={fetchRules}
            rules={rules}
            rulesLoading={rulesLoading}
          />
        );
        break;
      case 3:
        setTabContent(
          <Units
            fetchUnits={fetchUnits}
            units={units}
            unitsLoading={unitsLoading}
            categories={categories}
          />
        );
        break;
      default:
        break;
    }
  }, [
    value,
    gamesLoading,
    unitsLoading,
    rulesLoading,
    instructionsLoading,
    colors,
    games,
    instructions,
    rules,
    units,
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        <Typography variant="h3">Make</Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Games" />
        <Tab label="Instructions" />
        <Tab label="Rules" />
        <Tab label="Units" />
      </Tabs>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        {tabContent}
      </Box>
    </div>
  );
};

export default Make;
