import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Alban", text: "hey guys" },
    { username: "Tom", text: "whats up" }
  ]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(prompt("Please enter your name"));
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    setMessages([...messages, { username: username, text: input }]);
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
