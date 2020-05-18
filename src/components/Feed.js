import React, { useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useAuth0 } from "../react-auth0-spa";

const Feed = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      "https://je56gkvc39.execute-api.us-east-2.amazonaws.com/default/hbgFunction",
      { key1: `${name}, ${email}` }
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <Typography variant="h3" color="primary">
          Feed
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            value={name}
          />

          <label>email:</label>
          <input
            type="text"
            name="email"
            onChange={handleEmailChange}
            value={email}
          />

          <button type="submit">Send</button>
        </form>
      </Box>
    </div>
  );
};

export default Feed;
