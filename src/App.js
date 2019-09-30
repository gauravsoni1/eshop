import React from "react";
import "./app.modules.scss";
import Login from "./containers/login/login";
import ProductListing from "./containers/productListing/productListing";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/privateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/products" exact component={ProductListing} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
