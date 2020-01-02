import React from "react";
import FirebaseContext from "../Firebase/FirebaseContext";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({ render: Component, ...rest }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
        if (firebase === null || firebase.auth.currentUser === null) {
          firebase.auth = JSON.parse(sessionStorage.getItem("Firebase"));
        }
        return (
          <Route
            {...rest}
            render={props =>
              firebase !== null &&
              firebase.auth !== null &&
              firebase.auth.currentUser !== null ? (
                <Component firebase={firebase} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        );
      }}
    </FirebaseContext.Consumer>
  );
};
