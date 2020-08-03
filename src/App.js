import { FormControl, IconButton, Input } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { ThemeProvider } from "@material-ui/styles";
import DOMPurify from "dompurify";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import "./App.css";
import db from "./Firebase";
import Message from "./Message";

function App() {
  // Variables
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("");

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500]
      }
    }
  });
  // Everytimes the DB change the new message will appear in the user side
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  // On load off the app
  useEffect(() => {
    setUserName(prompt("Please enter your name"));
  }, []);
  // Sending message and clear the input
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
      <img
        className="app_img"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="facebook messenger logo"
      />
      <h1>Messenger Clone with firebase</h1>
      <h2>Welcome {username}</h2>
      <div className="app_messages">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} textMessage={message} />
          ))}
        </FlipMove>
      </div>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            disableUnderline={true}
            placeholder="Enter a message..."
            value={DOMPurify.sanitize(input)}
            onChange={event => setInput(event.target.value)}
          />
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
