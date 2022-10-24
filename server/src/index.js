import express from "express";
import httpServer from "http";
import { Server } from "socket.io";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/upcount", (req, res) => {
  io.emit("up");
  res.status(200);
});

app.post("/message", (req, res) => {
  const { message, username } = req.query;
  io.emit("message", { message, username });
  res.status(200);
});

io.on("connection", (socket) => {
  console.log("new connection");
  io.emit("new connection", "new connection");
});
