import React from "react";
import { Message } from "./Message";
import { Load } from "./Load";
import { store } from "../Store";
import { updateStore } from "../Firebase/DBHandler";

export const ChatDisplay = props => {
  if (store.getState().loading) {
    return (
      <div className="ChatDisplay">
        <Load />
      </div>
    );
  }
  return (
    <div className="ChatDisplay" id="ChatDisplay">
      <ul>
        {store.getState().messages.map(msg => {
          return (
            <Message
              key={msg.id}
              id={msg.id}
              sender={msg.sender}
              text={msg.Message}
              dpURL={msg.dpURL}
            />
          );
        })}
      </ul>
    </div>
  );
};
