import React from "react";
import NavBar from "./components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
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
          <Route path="/hello-blue-goose/profile" component={Profile} />
          <Route path="/hello-blue-goose/feed" component={Feed} />
          <Route path="/hello-blue-goose/todo" component={Todo} />
          <Route path="/hello-blue-goose/auth" component={Auth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
