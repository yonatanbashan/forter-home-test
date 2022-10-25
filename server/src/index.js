import express from "express";
import httpServer from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { isQuestion } from "./common.js";

const app = express();

app.use(cors());
const http = httpServer.createServer(app);

http.listen(3000, () => {
  console.log("listening on *:3000");
});

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const usernames = [];

// Key = message body, content: array of replies with message body, username and message ID
const replies = {};

app.post("/message", (req, res) => {
  const { message, username, replyToId, replyToMessage } = req.query;
  const newId = uuidv4();

  if (replyToMessage) {
    const lowerCaseRepliedToMessage = replyToMessage.toLowerCase();
    const existingReplies = replies[lowerCaseRepliedToMessage] ?? [];
    if (isQuestion(replyToMessage)) {
      const newReply = { message, username, id: newId, replyToId };
      replies[lowerCaseRepliedToMessage] = [...existingReplies, newReply];
    }
    io.emit("message", { message, username, id: newId, replyToId });
  } else {
    io.emit("message", { message, username, id: newId });
    const lowerCaseMessage = message.toLowerCase();
    if (isQuestion(message) && replies[lowerCaseMessage]?.length > 0) {
      const numOfReplies = replies[lowerCaseMessage].length;
      const lastReply = replies[lowerCaseMessage][numOfReplies - 1];
      const botReplyId = uuidv4();
      io.emit("message", {
        ...lastReply,
        botMessage: true,
        id: botReplyId,
        replyToId: newId,
      });
    }
  }
  res.sendStatus(200);
});

app.post("/add_user", (req, res) => {
  const { new_username } = req.query;
  if (!usernames.includes(new_username)) {
    usernames.push(new_username);
    res.send({ username: new_username });
  } else {
    let usernameExists = true;
    while (usernameExists) {
      let i = Math.floor(Math.random() * 10000);
      const usernameWithNumber = `${new_username}${i}`;
      if (!usernames.includes(usernameWithNumber)) {
        usernameExists = false;
        usernames.push(usernameWithNumber);
        res.send({ username: usernameWithNumber });
        return;
      }
    }
  }
});

io.on("connection", (socket) => {
  console.log("new connection");
  io.emit("new connection", "new connection");
});
