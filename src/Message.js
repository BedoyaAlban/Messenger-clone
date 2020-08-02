import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ textMessage, username }) {
  const isUser = username === textMessage.username;
  return (
    <div className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_noneUserCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {textMessage.username}: {textMessage.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
