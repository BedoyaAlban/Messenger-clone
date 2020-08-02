import { FormControl, IconButton, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import "./App.css";
import db from "./Firebase";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUserName(prompt("Please enter your name"));
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Messenger Clone with firebase</h1>
      <h2>Welcome {username}</h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message..."
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            type="submit"
            color="primary"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} textMessage={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
