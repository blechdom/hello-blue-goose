import React from "react";
import Box from "@material-ui/core/Box";
import { useAuth0 } from "../react-auth0-spa";
import logo from "../logo.svg";

const Home = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
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
