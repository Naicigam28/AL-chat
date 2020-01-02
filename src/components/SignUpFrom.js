import React, { useState } from "react";
import { useHistory } from "react-router";

export const SignUpForm = props => {
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  let history = useHistory();
  return (
    <div>
      <button type="submit">Sign up with google</button>
      <h3>Or Create an account</h3>
      <form>
        <label htmlFor="display-name">What will be your user name?</label>
        <input
          id="display-name"
          onChange={e => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="email">What is your email?</label>
        <input
          id="email"
          onChange={e => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="pass">Password:</label>
        <input
          id="pass"
          onChange={e => {
            console.log(e.target.value);
            setPassword(e.target.value);
          }}
        />
        <br />
        <label htmlFor="pass2"> Retype Password:</label>
        <input
          id="pass2"
          onChange={e => {
            console.log(e.target.value);
            setPassword2(e.target.value);
          }}
        />
        <br />
        <button
          onClick={e => {
            e.preventDefault();
            console.log(name);
            if (name === "") {
              alert("name cannot be empty");
              return;
            } else if (email === "") {
              alert("name cannot be empty");
              return;
            } else if (password !== password2) {
              alert("Passwords dont match!");
              return;
            } else {
              props.firebase.auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  props.firebase.auth
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                      var user = props.firebase.auth.currentUser;

                      user
                        .updateProfile({
                          displayName: name
                        })
                        .then(function() {
                          history.push("/chatroom");
                        })
                        .catch(function(error) {
                          var errorCode = error.code;
                          var errorMessage = error.message;
                          alert(errorCode + "\n" + errorMessage);
                        });
                    })
                    .catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      alert(errorCode + "\n" + errorMessage);
                      // ...
                    });
                })
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorCode + "\n" + errorMessage);
                  // ...
                });
            }
          }}
        >
          Sign me up!
        </button>
      </form>
    </div>
  );
};
