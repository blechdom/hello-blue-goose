import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Feed = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function getUsers() {
      const result = await axios.get(
        "https://jy7gj0jnx3.execute-api.us-east-2.amazonaws.com/default/hbgFunction"
      );
      setData(result);
    }
    getUsers();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      "https://jy7gj0jnx3.execute-api.us-east-2.amazonaws.com/default/hbgFunction",
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
      <Box display="flex" justifyContent="center" m={4} p={4}>
        {JSON.stringify(data)}
      </Box>
    </div>
  );
};

export default Feed;
