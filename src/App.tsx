import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameScreen } from "./containers/gameScreen";
import { HomeScreen } from "./containers/homeScreen";
import { PreStartScreen } from "./containers/preStartScreen";

const ViewportProvider = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

const App = () => {
  let { width } = ViewportProvider();
  const isMobile = width > 450 ? false : true;
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <HomeScreen isMobile={isMobile} />}
        />
        <Route
          exact
          path="/game"
          render={() => <GameScreen isMobile={isMobile} />}
        />
        <Route
          exact
          path="/prestart"
          render={() => <PreStartScreen isMobile={isMobile} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
