import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "2",
  },
  cover: {
    height: 200,
    width: 200,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <Typography variant="h3" color="primary">
          Profile
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={4} p={4}>
        <Card className={classes.root} m={4} p={4}>
          <CardMedia
            className={classes.cover}
            m={4}
            p={4}
            image={user.picture}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.email}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
