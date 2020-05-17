import React from "react";
import Box from "@material-ui/core/Box";
import logo from "../logo.svg";

const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <img
          src={logo}
          p={2}
          width="50%"
          display="inline-block"
          className="App-logo"
          alt="logo"
        />
      </Box>
    </div>
  );
};

export default Home;
