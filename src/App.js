import React from "react";
import NavBar from "./components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import Make from "./components/Make";
import Counter from "./components/counter/Counter";
import history from "./utils/history";

const NoMatch = () => (
  <h1>
    <center>404 Not Found</center>
  </h1>
);

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/make" component={Make} />
          <Route path="/counter" component={Counter} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
