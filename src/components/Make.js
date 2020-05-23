import React, { useEffect, useState } from "react";
import Games from "./Games";
import Instructions from "./Instructions";
import Rules from "./Rules";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Make = () => {
  const [value, setValue] = useState(0);
  const [tabContent, setTabContent] = useState();

  useEffect(() => {
    switch (value) {
      case 0:
        setTabContent(<Games />);
        break;
      case 1:
        setTabContent(<Instructions />);
        break;
      case 2:
        setTabContent(<Rules />);
        break;
      default:
        setTabContent(<Games />);
        break;
    }
  }, [value]);

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
      </Tabs>
      <Box display="flex" justifyContent="center" m={2} p={2}>
        {tabContent}
      </Box>
    </div>
  );
};

export default Make;
