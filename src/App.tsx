import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameScreen } from "./containers/gameScreen";
import { HomeScreen } from "./containers/homeScreen";
import { PreStartScreen } from "./containers/preStartScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/game" component={GameScreen} />
        <Route exact path="/prestart" component={PreStartScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
