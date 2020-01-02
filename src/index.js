import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import Firebase from "./Firebase/Firebase";
import FirebaseContext from "./Firebase/FirebaseContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { ChatroomWrapper } from "./components/Chatroom";
import { SignUpForm } from "./components/SignUpFrom";

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router>
        <Switch>
          <Route
            path="/signup"
            render={() => (
              <FirebaseContext.Consumer>
                {firebase => {
                  return <SignUpForm firebase={firebase} />;
                }}
              </FirebaseContext.Consumer>
            )}
          />
          <PrivateRoute path="/chatroom" render={ChatroomWrapper} />
          <Route
            render={() => (
              <FirebaseContext.Consumer>
                {firebase => {
                  return <LoginForm firebase={firebase} />;
                }}
              </FirebaseContext.Consumer>
            )}
          />
        </Switch>
      </Router>
    </FirebaseContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
