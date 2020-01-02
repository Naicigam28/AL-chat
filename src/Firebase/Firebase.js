import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCrdcZEHPLaOZtpp7GeiLNi_fWFXBQC8uM",
  authDomain: "al-chat-room.firebaseapp.com",
  databaseURL: "https://al-chat-room.firebaseio.com",
  projectId: "al-chat-room",
  storageBucket: "al-chat-room.appspot.com",
  messagingSenderId: "917843933170",
  appId: "1:917843933170:web:d4dfcb0432d09ef56a5d6b",
  measurementId: "G-03FEG0Z9R7"
};
// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.database = app.database();
    this.storage = app.storage();
  }
  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  signOut = () => {
    this.auth = app
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        // An error happened.
      });
  };
}
export default Firebase;
