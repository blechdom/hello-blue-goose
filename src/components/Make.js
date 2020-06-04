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
  const [value, setValue] = useState(0);
  const [tabContent, setTabContent] = useState();
  const [games, setGames] = useState([]);
  const [rules, setRules] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [units, setUnits] = useState([]);
  const [colors, setColors] = useState({});
  const [shapes, setShapes] = useState({});
  const [categories, setCategories] = useState({});
  const [things, setThings] = useState({});
  const [actions, setActions] = useState({});
  const [effects, setEffects] = useState({});
  const [variables, setVariables] = useState({});
  const [instructionsList, setInstructionsList] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [instructionsLoading, setInstructionsLoading] = useState(false);
  const [rulesLoading, setRulesLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState(false);
  const [gamesInit, setGamesInit] = useState(false);
  const [instructionsInit, setInstructionsInit] = useState(false);
  const [rulesInit, setRulesInit] = useState(false);
  const [unitsInit, setUnitsInit] = useState(false);

  useEffect(() => {
    if (!unitsInit) {
      fetchUnits();
    } else {
      setUnitsLoading(false);
      parseUnitsForGames();
    }
  }, [unitsInit]);

  useEffect(() => {
    if (!gamesInit) fetchGames();
  }, [colors, shapes, categories, things, gamesInit]);

  useEffect(() => {
    if (!instructionsInit) {
      fetchInstructions();
    } else {
      setInstructionsLoading(false);
      parseInstructionsForRules();
    }
  }, [instructionsInit]);

  useEffect(() => {
    if (!rulesInit) fetchRules();
  }, [instructionsList, rulesInit]);

  const fetchGames = async () => {
    setGamesLoading(true);
    try {
      const gameData = await API.graphql(graphqlOperation(listGames));
      const gamesData = gameData.data.listGames.items;
      setGames(gamesData);
      setGamesInit(true);
      setGamesLoading(false);
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
      setUnitsInit(true);
    } catch (err) {
      console.log("error fetching units");
      setUnitsLoading(false);
    }
  };

  const fetchInstructions = async () => {
    setInstructionsLoading(true);
    try {
      const instructionData = await API.graphql(
        graphqlOperation(listInstructions)
      );
      const instructionsData = instructionData.data.listInstructions.items;
      setInstructions(instructionsData);
      setInstructionsInit(true);
      setInstructionsLoading(false);
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
      setRulesInit(true);
      setRulesLoading(false);
    } catch (err) {
      console.log("error fetching rules");
      setRulesLoading(false);
    }
  };
  const reduceFromUnits = (unit_type) => {
    return units.reduce((a, o) => {
      o.unit_type === unit_type && (a[o.id] = o.name);
      return a;
    }, {});
  };

  const parseUnitsForGames = () => {
    const gameColors = reduceFromUnits("color");
    setColors(gameColors);
    const gameShapes = reduceFromUnits("shape");
    setShapes(gameShapes);
    const gameCategories = reduceFromUnits("category");
    setCategories(gameCategories);
    const gameThings = reduceFromUnits("thing");
    setThings(gameThings);
    const gameActions = reduceFromUnits("action");
    setActions(gameActions);
    const gameEffects = reduceFromUnits("effect");
    setEffects(gameEffects);
    const gameVariables = reduceFromUnits("variable");
    setVariables(gameVariables);
  };

  const parseInstructionsForRules = () => {
    const instructionsForList = instructions.reduce((a, o) => {
      a[o.id] = o.name;
      return a;
    }, {});
    setInstructionsList(instructionsForList);
  };

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
            actions={actions}
            effects={effects}
            variables={variables}
          />
        );
        break;
      case 1:
        setTabContent(
          <Rules
            fetchRules={fetchRules}
            rules={rules}
            rulesLoading={rulesLoading}
            instructionsList={instructionsList}
          />
        );
        break;
      case 2:
        setTabContent(
          <Instructions
            fetchInstructions={fetchInstructions}
            instructions={instructions}
            instructionsLoading={instructionsLoading}
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
    categories,
    instructionsList,
    shapes,
    things,
    games,
    instructions,
    rules,
    effects,
    variables,
    actions,
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
        <Tab label="Rules" />
        <Tab label="Instructions" />
        <Tab label="Units" />
      </Tabs>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        {tabContent}
      </Box>
    </div>
  );
};

export default Make;
