import { addMessage } from "../Actions/AddMessage";
import { clear } from "../Actions/ClearMessages";
import { setOnlineUsers } from "../Actions/SetOnlineUsers";
import { setLoading } from "../Actions/SetLoading";

export const sendMessage = (message, sender, FB, id, dispatch) => {
  FB.database
    .ref("messages")
    .push()
    .set({
      Message: message,
      sender: sender,
      dpURL: FB.auth.currentUser.photoURL
    })
    .then(() => {
      // console.log("TEST SEND");
      //updateStore(FB, dispatch);
    });
};

export const updateStore = (FB, dispatch) => {
  dispatch(clear());
  FB.database
    .ref("messages")
    .limitToLast(10)
    .on("child_added", function(data) {
      dispatch(
        addMessage(data.val().Message, data.val().sender, data.val().dpURL)
      );
    });
};

export const loadIntitalState = (FB, dispatch) => {
  dispatch(setLoading(true));
  FB.database
    .ref("messages")
    .limitToLast(10)
    .once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        dispatch(
          addMessage(
            childSnapshot.val().Message,
            childSnapshot.val().sender,
            childSnapshot.val().dpURL
          )
        );
      });
      dispatch(setLoading(false));
      updateStore(FB, dispatch);
      // ...
    });
};

export const setUserStatus = (FB, status) => {
  let uid = FB.auth.currentUser.uid;
  let name = FB.auth.currentUser.displayName;
  FB.database.ref("users/" + uid).set({
    online: status,
    user: name
  });
};

export const getOnlineUsers = (FB, dispatch) => {
  let user = FB.auth.currentUser.displayName;

  FB.database
    .ref("users")
    .once("value")
    .then(function(snapshot) {
      let onlineUsers = [];
      snapshot.forEach(function(childSnapshot) {
        if (
          childSnapshot.val().online === true &&
          childSnapshot.val().user !== user
        ) {
          onlineUsers.push(childSnapshot.val().user);
        }
      });
      dispatch(setOnlineUsers(onlineUsers));
    });
};
