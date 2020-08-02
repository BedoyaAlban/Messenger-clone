import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ textMessage, username }, ref) => {
  const isUser = username === textMessage.username;
  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_noneUserCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${textMessage.username || "Unknown User"}: `}{" "}
            {textMessage.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
