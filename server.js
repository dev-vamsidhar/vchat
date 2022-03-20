const { instrument } = require("@socket.io/admin-ui");
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  origins: ["http://localhost:8080"],

  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true,
    });
    res.end();
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
