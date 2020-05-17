import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <div>
              <Button component={Link} to="/" color="inherit">
                Hello Blue Goose
              </Button>
              <Button component={Link} to="/feed" color="inherit">
                Feed
              </Button>
              <Button component={Link} to="/profile" color="inherit">
                Profile
              </Button>
              <Button color="inherit" onClick={() => logout()}>
                Log out
              </Button>
            </div>
          )}
          {!isAuthenticated && (
            <Button color="inherit" onClick={() => loginWithRedirect({})}>
              Log in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
