const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const emailToSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on('register', (id) => {
    emailToSocketMap.set(id, socket.id);
  });

  socket.on("user-message", (info) => {
    const { agentEmail, text } = info;
    const agentSocketId = emailToSocketMap.get(agentEmail);
    console.log('agentEmail', agentEmail)
    // Send message to agent
    if (agentSocketId) {
      io.to(agentSocketId).emit("agent-reply", text);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Socket.IO server running on http://localhost:5000");
});
