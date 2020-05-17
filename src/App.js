import React from "react";
import NavBar from "./components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import history from "./utils/history";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/hello-blue-goose" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/feed" component={Feed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
