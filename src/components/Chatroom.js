import React, { useState } from "react";
import { connect, Provider } from "react-redux";
import { store } from "../Store";
import {
  loadIntitalState,
  setUserStatus,
  getOnlineUsers
} from "../Firebase/DBHandler";
import { SideBar } from "./Sidebar";
import { ChatDisplay } from "./ChatDisplay";
import { Input } from "./Input";
let messagesLoaded = false;

export const Chatroom = props => {
  let firebase = props.firebase;
  const [open, setOpen] = useState(false);
  let sender = props.firebase.auth.currentUser.displayName;
  if (!messagesLoaded) {
    loadIntitalState(firebase, store.dispatch);
    setUserStatus(firebase, true);
    getOnlineUsers(firebase, store.dispatch);
    messagesLoaded = true;
  }

  return (
    <div id="Content">
      <SideBar firebase={firebase} users={props.users} open={open} />
      <div
        className="main"
        style={{
          width: open ? "100%" : "150%",
          transform: open ? "translateX(0)" : "translateX(-5%)",
          transition: "transform 0.3s ease-in-out"
        }}
      >
        <button
          className="fas fa-bars"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <ChatDisplay
          className="Messages"
          messages={props.messages}
          firebase={firebase}
        />
        <Input firebase={firebase} sender={sender} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { messages: state.messages, users: state.users };
};

const Container = connect(
  mapStateToProps,
  null
)(Chatroom);

export const ChatroomWrapper = props => {
  return (
    <Provider store={store}>
      <Container firebase={props.firebase} />
    </Provider>
  );
};
