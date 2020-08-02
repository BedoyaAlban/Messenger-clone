import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./Firebase";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
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
      <h1>Messenger Clone with firebase</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            type="submit"
            color="primary"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>

      {messages.map(message => (
        <Message username={username} textMessage={message} />
      ))}
    </div>
  );
}

export default App;
