import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Profile = () => {
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <Typography variant="h3" color="primary">
          Profile
        </Typography>
      </Box>
    </div>
  );
};

export default Profile;
