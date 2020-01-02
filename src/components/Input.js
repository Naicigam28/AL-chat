import React from "react";
import ReactDOM from "react-dom";
import { store } from "../Store";
import { setInput } from "../Actions/SetInput";
import { sendMessage, setUserStatus } from "../Firebase/DBHandler";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
var emojiVisible = false;
export const Input = props => {
  return (
    <form>
      <div className="TextBar">
        <input
          id="input"
          onChange={e => {
            store.dispatch(setInput(e.target.value.trim()));
          }}
          defaultValue={store.getState().input}
        />

        <button
          onClick={e => {
            let message = store.getState().input.trim();
            if (message !== "") {
              e.preventDefault();
              sendMessage(
                message,
                props.sender,
                props.firebase,
                store.getState().id + 1,
                store.dispatch
              );
              setUserStatus(props.firebase, true);
              ReactDOM.render(<div />, document.getElementById("emoji"));
              var element = document.getElementById("ChatDisplay");
              element.scrollTop = element.scrollHeight;
            }
          }}
        >
          Send
        </button>
        <div id="emoji" />
        <button
          onClick={e => {
            e.preventDefault();
            if (emojiVisible) {
              ReactDOM.render(<div />, document.getElementById("emoji"));
              emojiVisible = false;
            } else {
              ReactDOM.render(
                <Picker
                  set="emojione"
                  onSelect={e => {
                    let input = store.getState().input;
                    input = input + e.native;
                    store.dispatch(setInput(input.trim()));
                    document.getElementById("input").value = input;
                  }}
                />,
                document.getElementById("emoji")
              );
              e.target.focus();
              emojiVisible = true;
            }
          }}
        >
          emoji
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            props.firebase.database
              .ref("messages")
              .once("value")
              .then(function(snapshot) {
                let data = [];
                snapshot.forEach(function(childSnapshot) {
                  data.push([
                    childSnapshot.val().Message,
                    childSnapshot.val().sender
                  ]);
                });
                let csv = "Name,Title\n";
                data.forEach(function(row) {
                  csv += row.join(",");
                  csv += "\n";
                });
                let hiddenElement = document.createElement("a");
                hiddenElement.href =
                  "data:text/csv;charset=utf-8," + encodeURI(csv);
                hiddenElement.target = "_blank";
                hiddenElement.download = "data.csv";
                hiddenElement.click();

                // ...
              });
          }}
        >
          Export Chat
        </button>
      </div>
    </form>
  );
};
