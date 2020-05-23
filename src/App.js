import React from "react";
import NavBar from "./components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import Make from "./components/Make";
import history from "./utils/history";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/make" component={Make} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
