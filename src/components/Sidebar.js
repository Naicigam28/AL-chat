import React from "react";
import { store } from "../Store";
import { getOnlineUsers, setUserStatus } from "../Firebase/DBHandler";
import { useHistory } from "react-router";

export const SideBar = props => {
  const firebase = props.firebase;

  let name = firebase.auth.currentUser.displayName;
  let email = firebase.auth.currentUser.email;
  let history = useHistory();

  return (
    <div
      className="sidenav"
      style={{
        transform: props.open ? "translateX(0)" : "translateX(-120%)",
        transition: "transform 0.3s ease-in-out"
      }}
    >
      <h1>AL chat</h1>
      <hr />
      <p>
        <br />
        {name}
      </p>
      <img
        src={firebase.auth.currentUser.photoURL}
        alt="Couldnt load Display image"
      />
      <button
        onClick={() => {
          let user = firebase.auth.currentUser;
          let newName = prompt("Enter your new display name", name);
          user
            .updateProfile({
              displayName: newName
            })
            .then(function() {
              // Update successful.
              alert(
                "Display name changed. Changes will take effect on your next login"
              );
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              alert(errorCode + "\n" + errorMessage);
              // ...
            });
        }}
      >
        Change display name
      </button>
      <p>Change Display photo:</p>{" "}
      <input
        type="file"
        name="myFile"
        onChange={event => {
          console.log(event.target.files, "Selected");
          let uid = firebase.auth.currentUser.uid;
          let storage = firebase.storage
            .ref()
            .child(uid)
            .child("dp.jpg");

          let fileData = event.target.files[0];
          storage.put(fileData);

          storage.getDownloadURL().then(url => {
            console.log(url);
            let user = firebase.auth.currentUser;
            console.log(user);
            user
              .updateProfile({
                photoURL: url
              })
              .then(function() {
                // Update successful.
                alert("Success");
              })
              .catch(function(error) {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorCode + "\n" + errorMessage);
              });
          });
        }}
      />
      <p>{email}</p>
      <button
        onClick={() => {
          let user = firebase.auth.currentUser;
          let newEmail = prompt("Enter your new email", email);
          user
            .updateEmail(newEmail)
            .then.then(function() {
              // Update successful.
              alert(
                "Email address changed. Changes will take effect on your next login"
              );
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              alert(errorCode + "\n" + errorMessage);
              // ...
            });
        }}
      >
        Change email name
      </button>
      <hr />
      <h2>Online users</h2>
      <ul>
        {props.users.map(user => {
          return <li key={user}>{user}</li>;
        })}
      </ul>
      <hr />
      <button
        onClick={() => {
          setUserStatus(firebase, false);
          firebase.signOut();
          sessionStorage.clear();
          localStorage.clear();
          history.push("/");
        }}
      >
        Signout
      </button>
    </div>
  );
};
