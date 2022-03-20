const { instrument } = require("@socket.io/admin-ui");
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
httpServer.listen(3001);
console.log("started");
io.on("connection", (socket) => {
  socket.on("send-msg", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive", message);
    } else {
      socket.to(room).emit("receive", message);
    }
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("they joined the room " + room);
  });
});
