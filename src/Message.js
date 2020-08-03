import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ textMessage, username }, ref) => {
  const isUser = username === textMessage.username;
  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      {!isUser ? (
        <div className="message_date">
          {new Date(textMessage.timestamp.seconds * 1000).toUTCString()}
        </div>
      ) : null}
      <Card className={isUser ? "message_userCard" : "message_noneUserCard"}>
        <CardContent>
          <Typography color="inherit" variant="h5" component="h2">
            {!isUser && `${textMessage.username || "Unknown User"}: `}{" "}
            {textMessage.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
