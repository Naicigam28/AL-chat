import React from "react";
import useForm from "react-hook-form";

import FirebaseContext from "../Firebase/FirebaseContext";
import { useHistory } from "react-router";

export const LoginForm = props => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    props.firebase.auth
      .signInWithEmailAndPassword(data.email, data.pass)
      .then(result => {
        sessionStorage.setItem("Firebase", JSON.stringify(props.firebase.auth));
        history.push("/chatroom");
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorCode + "\n" + errorMessage);
        // ...
      });
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="Login border">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name="email" placeholder="type your email" ref={register} />
        <label>Password</label>
        <input name="pass" type="password" placeholder="type your password" />
        {errors.exampleRequired && <p>This field is required</p>}
        <br />
        <button type="submit">Log In</button>
        <br />
        <button
          onClick={() => {
            props.firebase.doSignInWithGoogle().then(socialAuthUser => {
              sessionStorage.setItem(
                "Firebase",
                JSON.stringify(props.firebase.auth)
              );
              history.push("/chatroom");
            });
          }}
        >
          Sign in with Google
        </button>
        <br />
        <button
          onClick={() => {
            window.location = "https://puxbx.csb.app/signup";
          }}
        >
          Create an account
        </button>
        <br />
        <button
          onClick={() => {
            var auth = props.firebase.auth;
            var emailAddress = prompt("Please enter your email address");

            auth
              .sendPasswordResetEmail(emailAddress)
              .then(function() {
                // Email sent.
                alert(
                  "An Email has been sent to you with a link to reset your password"
                );
              })
              .catch(function(error) {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorCode + "\n" + errorMessage);
                // ...
              });
          }}
        >
          forgot password?
        </button>
      </form>
    </div>
  );
};
