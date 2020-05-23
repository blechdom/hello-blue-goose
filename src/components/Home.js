import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <Link to="/play">
        <Box display="flex" justifyContent="center" m={4} p={4}>
          <img
            src={logo}
            p={2}
            width="30%"
            display="inline-block"
            className="App-logo"
            alt="logo"
          />
        </Box>
      </Link>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <Typography variant="h2">How to play</Typography>
      </Box>
    </div>
  );
};

export default Home;
