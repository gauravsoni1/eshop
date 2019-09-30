import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const authenticate = () => {
    return (sessionStorage.getItem("fullName") === null ? false :true)
};

class PrivateRoute extends Component {
  render() {
    return (
      <>{authenticate() ? <Route {...this.props} /> : <Redirect to="/" />}</>
    );
  }
}

export default PrivateRoute;
