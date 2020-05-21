import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <Button component={Link} to="" color="inherit">
              Hello Blue Goose
            </Button>
            <Button component={Link} to="/feed" color="inherit">
              Feed
            </Button>
            <Button component={Link} to="/profile" color="inherit">
              Profile
            </Button>
            <Button component={Link} to="/todo" color="inherit">
              Todo
            </Button>
            <Button component={Link} to="/auth" color="inherit">
              Auth
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
